import { storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const fb_uploadProfileImage = async (userId, image) => {
  if (!image) return null;
  const res = await fetch(image);
  const imageblob = await res.blob();
  const storageRef = ref(storage, `Profile-Image/${userId}`);
  // 'file' comes from the Blob or File API
  await uploadBytes(storageRef, imageblob);
  const imageUrl = await getDownloadURL(storageRef);
  return imageUrl;
};
