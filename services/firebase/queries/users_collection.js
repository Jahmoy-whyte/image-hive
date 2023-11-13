import { firebaseAuth, db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const fb_getProfile = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  return docSnap;
};
