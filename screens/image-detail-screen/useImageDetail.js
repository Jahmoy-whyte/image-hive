import { useRoute } from "@react-navigation/native";
import { useState, useReducer, useEffect } from "react";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { showToast } from "../../utils/toastLib";

const useImageDetail = () => {
  const route = useRoute();

  const imageData = route.params.imageData;

  const initialState = {
    profileData: {},
    comments: [],
    isLoadingComments: true,
    isLoadingProfile: true,
    isError: null,
    isSaved: false,
    isFollowing: false,
  };

  const ACTIONS = {
    set_comments: "set_comments",
    set_profile_data: "set_profile_data",
    set_is_Loading_Profile: "set_is_Loading_Profile",
    set_is_error: "set_is_error",
    set_is_Loading_Comments: "set_is_Loading_Comments",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "set_comments":
        return { ...state, comments: action.payload };
      case "set_profile_data":
        return { ...state, profileData: action.payload };
      case "set_is_Loading_Profile":
        return { ...state, isLoadingProfile: action.payload };
      case "set_is_Loading_Comments":
        return { ...state, isLoadingComments: action.payload };
      case "set_is_error":
        return { ...state, isError: action.payload };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getProfile();
    getComments();
  }, []);

  const getProfile = async () => {
    try {
      const docRef = doc(db, "users", imageData.userId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) throw new Error("document not found");
      dispatch({ type: ACTIONS.set_profile_data, payload: docSnap.data() });
    } catch (error) {
      showToast().error("", error.message);
      dispatch({ type: ACTIONS.set_is_error, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.set_is_Loading_Profile, payload: false });
    }
  };

  const getComments = async () => {
    try {
      const q = query(
        collection(db, "published", imageData.id, "comments"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      const commentsArray = [];
      querySnapshot.forEach((doc) => {
        commentsArray.push({ id: doc.id, ...doc.data() });
      });
      dispatch({ type: ACTIONS.set_comments, payload: commentsArray });
    } catch (error) {
      showToast().error("", error.message);
      dispatch({ type: ACTIONS.set_is_error, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.set_is_Loading_Comments, payload: false });
    }
  };

  return { imageData, state, dispatch };
};

export default useImageDetail;
