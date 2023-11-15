import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useReducer, useEffect } from "react";
import { showToast } from "../../utils/toastLib";
import { fb_getProfile } from "../../services/firebase/functions/users_collection";
import { fb_getComments } from "../../services/firebase/functions/comments_subCollection";

const useImageDetail = () => {
  const route = useRoute();
  const nav = useNavigation();

  const imageData = route.params.imageData;

  const initialState = {
    profileData: {},
    comments: [],
    isLoadingComments: true,
    isLoadingProfile: true,
    isError: null,
    isSaved: false,
    isFollowing: false,
    showModel: false,
    commentTextBox: "",
  };

  const ACTIONS = {
    set_comments: "set_comments",
    set_profile_data: "set_profile_data",
    set_is_Loading_Profile: "set_is_Loading_Profile",
    set_is_error: "set_is_error",
    set_is_Loading_Comments: "set_is_Loading_Comments",
    retry: "retry",
    set_showModel: "set_showModel",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "retry":
        return initialState;
      case "set_comments":
        return { ...state, comments: action.payload };
      case "set_profile_data":
        return { ...state, profileData: action.payload };
      case "set_is_Loading_Profile":
        return { ...state, isLoadingProfile: action.payload };
      case "set_is_Loading_Comments":
        return { ...state, isLoadingComments: action.payload };
      case "set_showModel":
        return { ...state, showModel: action.payload };
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

  const retry = () => {
    // state state back to inital state
    dispatch({ type: ACTIONS.retry });
    getProfile();
    getComments();
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

  const getComments = async () => {
    try {
      const { commentsArray } = await fb_getComments(imageData.id);
      dispatch({ type: ACTIONS.set_comments, payload: commentsArray });
    } catch (error) {
      showToast().error("", error.message);
      dispatch({
        type: ACTIONS.set_is_error,
        payload: "error occurred whilst getting comments please try agian",
      });
    } finally {
      dispatch({ type: ACTIONS.set_is_Loading_Comments, payload: false });
    }
  };

  return { imageData, state, dispatch, retry };
};

export default useImageDetail;
