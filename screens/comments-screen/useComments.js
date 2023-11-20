import { useEffect, useReducer } from "react";
import {
  fb_getComments,
  fb_loadMoreComments,
} from "../../services/firebase/functions/comments_subCollection";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { fa } from "@faker-js/faker";
import { showToast } from "../../utils/toastLib";
import useCommentModel from "../../hooks/useCommentModel";
import { useAuthContext } from "../../context/AuthContextProvider";

const useComments = () => {
  const initalCommentLimitNumber = 5;
  const placeHolderCommentsArray = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];
  const route = useRoute();
  const imageId = route.params.imageId;
  const navigation = useNavigation();
  const initialState = {
    isLoading: true,
    error: null,
  };

  const ACTIONS = {
    set_error: "set_error",
    reset_state: "reset_state",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "reset_state":
        return initialState;

      case "set_error":
        return { ...state, error: action.payload };

      default:
        return state;
    }
  };

  const { user } = useAuthContext();

  const [state, dispatch] = useReducer(reducer, initialState);
  const commentHook = useCommentModel(imageId);

  useEffect(() => {
    commentHook.getComments(initalCommentLimitNumber);
  }, []);

  const retry = () => {
    commentHook.resetState();
    commentHook.getComments(initalCommentLimitNumber);
  };

  const navigateToProfile = (id) => {
    navigation.navigate("profile", {
      id: id,
    });
  };

  return {
    state,
    dispatch,
    navigateToProfile,
    retry,
    commentHook,
    placeHolderCommentsArray,
    user,
  };
};

export default useComments;
