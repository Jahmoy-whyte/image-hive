import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
export const fb_getCategories = async () => {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const array = [];
  querySnapshot.forEach((doc) => {
    array.push({ id: doc.id, ...doc.data() });
  });
  return array;
};
