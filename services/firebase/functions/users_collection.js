import { db } from "../firebaseConfig";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export const fb_getProfile = async (id) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  return docSnap;
};

export const fb_createProfile = async (
  userId,
  username,
  selected = [],
  imageUrl
) => {
  await setDoc(doc(db, "users", userId), {
    id: userId,
    username: username,
    categories: selected,
    profileImage: imageUrl,
    bio: "",
    timeStamp: serverTimestamp(),
  });
};
