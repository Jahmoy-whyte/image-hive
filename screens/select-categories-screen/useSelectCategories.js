import { useRoute } from "@react-navigation/native";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db, storage, firebaseAuth } from "../../firebase/firebaseConfig";
import { showToast } from "../../utils/toastLib";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthContext } from "../../context/AuthContextProvider";

const useSelectCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);

  const { getProfile } = useAuthContext();
  const route = useRoute();
  const userId = firebaseAuth.currentUser.uid;
  const { image, username } = route.params;

  console.log(selected);

  useEffect(() => {
    const getCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const array = [];
      querySnapshot.forEach((doc) => {
        array.push({ id: doc.id, ...doc.data() });
      });

      console.log(array);
      setCategories(array);
      setIsLoading(false);
    };

    getCategories();
  }, []);

  const select = (id) => {
    if (!selected.includes(id)) {
      if (selected.length >= 3)
        return showToast().error(
          "",
          "You can only select up to 3 categories tap to uncheck one to select the other"
        );
      setSelected((prev) => [...prev, id]);
    } else {
      setSelected((prev) => prev.filter((prevId) => prevId != id));
    }
  };

  const uploadImage = async () => {
    if (!image) return null;
    const res = await fetch(image);
    const imageblob = await res.blob();
    const storageRef = ref(storage, `Profile-Image/${userId}`);
    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, imageblob);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  };

  const createProfile = async () => {
    setButtonIsLoading(true);
    try {
      if (selected.length < 3) throw new Error("Please select 3 categories");
      const imageUrl = await uploadImage();
      // Add a new document in collection "cities"
      await setDoc(doc(db, "users", userId), {
        id: userId,
        username: username,
        categories: selected,
        profileImage: imageUrl,
        bio: "",
        timeStamp: serverTimestamp(),
      });
      // getProfile will get and set the user obj in auth context as well as
      // navigate to the signed in stack on profile creation
      await getProfile(userId);
    } catch (error) {
      showToast().error("", error.message);
    } finally {
      setButtonIsLoading(false);
    }
  };

  return {
    selected,
    setSelected,
    categories,
    isLoading,
    createProfile,
    select,
    buttonIsLoading,
  };
};

export default useSelectCategories;
