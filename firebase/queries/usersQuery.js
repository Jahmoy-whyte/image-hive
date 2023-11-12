import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { firebaseAuth } from "../firebaseConfig";
import inputValidater from "../../utils/inputValidater";

const signUp = async (auth, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export { signUp };
