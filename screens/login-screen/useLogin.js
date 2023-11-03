import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { showToast } from "../../utils/toastLib";
import { useState } from "react";
import inputValidater from "../../utils/inputValidater";
import { useNavigation } from "@react-navigation/native";

const useLogin = () => {
  const auth = getAuth();
  const nav = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [textBoxValue, setTextBoxValue] = useState({
    email: "",
    password: "",
  });

  const { string, validateSchema } = inputValidater();

  const loginSchema = {
    email: () => string().isNotBlank("Please enter email").isEmail(),
    password: () => string().isNotBlank("Please enter password"),
  };

  const login = () => {
    const userLogin = {
      email: textBoxValue.email.trim(),
      password: textBoxValue.password.trim(),
    };
    const { isValid, error } = validateSchema(loginSchema, userLogin);
    if (!isValid) return showToast().error("", error);

    setIsLoading(true);
    signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user.emailVerified) return;

        nav.navigate("verify-email");
      })
      .catch((error) => {
        const code = error.code;
        showToast().error("", code);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { login, isLoading, textBoxValue, setTextBoxValue };
};

export default useLogin;
