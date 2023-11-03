import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { firebaseAuth } from "../../firebaseConfig";
import inputValidater from "../../utils/inputValidater";
import { showToast } from "../../utils/toastLib";
import { useNavigation } from "@react-navigation/native";

const useSignUp = () => {
  const nav = useNavigation();
  const auth = getAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [textBoxValue, setTextBoxValue] = useState({
    email: "",
    password: "",
    checked: false,
  });

  const { string, bool, validateSchema } = inputValidater();

  const signUpSchema = {
    email: () =>
      string()
        .isNotBlank("Please enter email")
        .isEmail("Email format is incorrect"),
    password: () =>
      string()
        .isNotBlank("Please enter password")
        .minLength(8, "Password must 8 letters or more"),
    checked: () => bool().isTrue("Please read and agree to our privacy policy"),
  };

  const createUser = () => {
    const { isValid, error } = validateSchema(signUpSchema, {
      ...textBoxValue,
      email: textBoxValue.email.trim(),
      password: textBoxValue.password.trim(),
    });
    if (!isValid) {
      showToast().error("", error);
      return;
    }

    setIsLoading(true);
    createUserWithEmailAndPassword(
      auth,
      textBoxValue.email.trim(),
      textBoxValue.password.trim()
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        nav.navigate("verify-email");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showToast().error("", errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    textBoxValue,
    setTextBoxValue,
    createUser,
  };
};

export default useSignUp;
