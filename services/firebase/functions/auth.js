import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useState } from "react";
import { firebaseAuth } from "../firebaseConfig";
import inputValidater from "../../../utils/inputValidater";

export const fb_signUp = async (auth, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export const fb_login = async (auth, email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

export const fb_sendEmailVerification = async (auth) => {
  await sendEmailVerification(auth.currentUser);
};

export const fb_reloadCurrentUser = async () => {
  await auth.currentUser.reload();
};
