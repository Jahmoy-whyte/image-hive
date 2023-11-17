import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useReducer, useEffect } from "react";
import { showToast } from "../../utils/toastLib";
import { fb_getProfile } from "../../services/firebase/functions/users_collection";
import { fb_getComments } from "../../services/firebase/functions/comments_subCollection";
import useCommentModel from "../../hooks/useCommentModel";

const useImageDetail = () => {
  const route = useRoute();
  const nav = useNavigation();

  const imageData = route.params.imageData;

  const initialState = {
    profileData: {},
    isLoadingProfile: true,
    isError: null,
    isSaved: false,
    isFollowing: false,
    showModel: false,
  };

  const ACTIONS = {
    set_profile_data: "set_profile_data",
    set_is_Loading_Profile: "set_is_Loading_Profile",
    set_is_error: "set_is_error",
    retry: "retry",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "retry":
        return initialState;
      case "set_profile_data":
        return { ...state, profileData: action.payload };
      case "set_is_Loading_Profile":
        return { ...state, isLoadingProfile: action.payload };
      case "set_is_error":
        return { ...state, isError: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const commentHook = useCommentModel(imageData.id);

  useEffect(() => {
    getProfile();
    commentHook.getComments(1);
  }, []);

  const retry = () => {
    // state state back to inital state
    dispatch({ type: ACTIONS.retry });
    commentHook.resetState();
    getProfile();
    commentHook.getComments(1);
  };

  const getProfile = async () => {
    try {
      const docSnap = await fb_getProfile(imageData.userId);
      if (!docSnap.exists()) throw new Error("user not found");
      dispatch({ type: ACTIONS.set_profile_data, payload: docSnap.data() });
    } catch (error) {
      showToast().error("", error.message);
      dispatch({ type: ACTIONS.set_is_error, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.set_is_Loading_Profile, payload: false });
    }
  };

  return { imageData, state, dispatch, retry, commentHook };
};

export default useImageDetail;
