import { useRoute } from "@react-navigation/native";

import { useEffect, useState } from "react";

import { firebaseAuth } from "../../services/firebase/firebaseConfig";
import { showToast } from "../../utils/toastLib";

import { useAuthContext } from "../../context/AuthContextProvider";
import { fb_getCategories } from "../../services/firebase/queries/categories_collection";
import { fb_uploadProfileImage } from "../../services/firebase/queries/imageUpload";
import { fb_createProfile } from "../../services/firebase/queries/users_collection";

const useSelectCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);

  const { getProfile } = useAuthContext();
  const route = useRoute();
  const userId = firebaseAuth.currentUser.uid;
  const { image, username } = route.params;

  useEffect(() => {
    const getCategories = async () => {
      const categories = await fb_getCategories();
      setCategories(categories);
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

  const createProfile = async () => {
    setButtonIsLoading(true);
    try {
      if (selected.length < 3) throw new Error("Please select 3 categories");
      const imageUrl = await fb_uploadProfileImage(userId, image);
      await fb_createProfile(userId, username, selected, imageUrl);
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
