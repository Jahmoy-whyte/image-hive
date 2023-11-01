import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebaseConfig";
import inputValidater from "../../utils/inputValidater";

const useSignUp = () => {
  const auth = getAuth();
  const [textBoxValue, setTextBoxValue] = useState({
    email: "",
    password: "",
    checked: false,
  });

  const createUser = () => {
    const { string, bool } = inputValidater();
    const wdwd = string().isString().isEmail().validate("dw@gmail.com");

    console.log(wdwd);
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
