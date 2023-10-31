import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { isString } from "../../utils/inputValidaters";
import { auth } from "../../firebaseConfig";
const useSignUp = () => {
  const auth = getAuth();
  const [textBoxValue, setTextBoxValue] = useState({
    email: "",
    password: "",
    checked: false,
  });

  const createUser = () => {
    const message = isString(2);
    return;
    createUserWithEmailAndPassword(
      auth,
      textBoxValue.email.trim(),
      textBoxValue.password.trim()
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return {
    textBoxValue,
    setTextBoxValue,
    createUser,
  };
};

export default useSignUp;
