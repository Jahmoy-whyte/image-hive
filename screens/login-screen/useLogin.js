import { firebaseAuth } from "../../services/firebase/firebaseConfig";
import { showToast } from "../../utils/toastLib";
import { useState } from "react";
import inputValidater from "../../utils/inputValidater";
import { useNavigation } from "@react-navigation/native";
import { fb_login } from "../../services/firebase/queries/auth";
const useLogin = () => {
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

  const login = async () => {
    const userLogin = {
      email: textBoxValue.email.trim(),
      password: textBoxValue.password.trim(),
    };

    const { isValid, error } = validateSchema(loginSchema, userLogin);
    if (!isValid) return showToast().error("", error);

    setIsLoading(true);
    try {
      const user = await fb_login(
        firebaseAuth,
        userLogin.email,
        userLogin.password
      );
      if (user.emailVerified) return;
      nav.navigate("verify-email");
    } catch (error) {
      const code = error.code;
      showToast().error("", code);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, textBoxValue, setTextBoxValue };
};

export default useLogin;
