import { useState } from "react";
import inputValidater from "../../utils/inputValidater";
import { showToast } from "../../utils/toastLib";
import { useNavigation } from "@react-navigation/native";
import { fb_signUp } from "../../services/firebase/functions/auth";
import { firebaseAuth } from "../../services/firebase/firebaseConfig";

const useSignUp = () => {
  const nav = useNavigation();

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
        .minLength(1, "Password must 8 letters or more"),
    checked: () => bool().isTrue("Please read and agree to our privacy policy"),
  };

  const createUser = async () => {
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
    try {
      await fb_signUp(
        firebaseAuth,
        textBoxValue.email.trim(),
        textBoxValue.password.trim()
      );
      nav.navigate("verify-email");
    } catch (error) {
      showToast().error("", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    textBoxValue,
    setTextBoxValue,
    createUser,
  };
};

export default useSignUp;
