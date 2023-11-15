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

const useComments = () => {
  const initalCommentLimitNuber = 5;
  const route = useRoute();
  const imageId = route.params.imageId;
  const navigation = useNavigation();
  const initialState = {
    comments: [],
    isLoading: true,
    error: null,
    commentTextBox: "",
    isDocEnd: false,
    isLoadingMoreComments: false,
    lastVisibleDoc: null,
  };

  const ACTIONS = {
    set_commentsAndLastDoc: "set_commentsAndLastDoc",
    set_error: "set_error",
    set_isLoading: "set_isLoading",
    set_commentTextBox: "set_commentTextBox",
    reset_state: "reset_state",
    set_isLoadingMoreComments: "set_isLoadingMoreComments",
    set_isDocEnd: "set_isDocEnd",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "reset_state":
        return initialState;
      case "set_commentsAndLastDoc": {
        const comments = action.payload.comments;
        const lastVisibleDoc = action.payload.lastVisibleDoc;

        return {
          ...state,
          comments: [...state.comments, ...comments],
          lastVisibleDoc: lastVisibleDoc,
          isLoading: false,
          isLoadingMoreComments: false,
        };
      }

      case "set_error":
        return { ...state, error: action.payload };
      case "set_isLoading":
        return { ...state, isLoading: action.payload };
      case "set_commentTextBox":
        return { ...state, commentTextBox: action.payload };
      case "set_isLoadingMoreComments":
        return { ...state, isLoadingMoreComments: action.payload };
      case "set_isDocEnd":
        return { ...state, isDocEnd: action.payload };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getInitalComments();
  }, []);

  const retry = () => {
    dispatch({ type: ACTIONS.reset_state });
    getInitalComments();
  };

  const getInitalComments = async () => {
    try {
      const { lastVisible, commentsArray } = await fb_getComments(
        imageId,
        initalCommentLimitNuber
      );

      dispatch({
        type: ACTIONS.set_commentsAndLastDoc, //sets  comments ,  lastVisibleDoc , isLoading to false and isLoadingMoreComments to false
        payload: { comments: commentsArray, lastVisibleDoc: lastVisible },
      });
    } catch (error) {
      const errMsg = "error occurred whilst getting comments";
      dispatch({
        type: ACTIONS.set_error,
        payload: errMsg,
      });
      showToast().error("", errMsg);
    }
  };

  const loadMoreComments = async () => {
    if (state.isLoading || state.isLoadingMoreComments || state.isDocEnd)
      return;

    // show loading inicator
    dispatch({ type: ACTIONS.set_isLoadingMoreComments, payload: true });

    try {
      const { lastVisible, commentsArray } = await fb_loadMoreComments(
        imageId,
        2,
        state.lastVisibleDoc
      );

      if (!lastVisible)
        // if lastlvisibile is falsy set doc end to true
        dispatch({
          type: ACTIONS.set_isDocEnd,
          payload: true,
        });

      dispatch({
        type: ACTIONS.set_commentsAndLastDoc, //sets  comments ,  lastVisibleDoc , isLoading to false and isLoadingMoreComments to false
        payload: { comments: commentsArray, lastVisibleDoc: lastVisible },
      });
    } catch (error) {
      const errMsg = "error occurred whilst getting comments";
      dispatch({
        type: ACTIONS.set_error,
        payload: errMsg,
      });
      showToast().error("", error.message);
    }
  };

  const navigateToProfile = (id) => {
    navigation.navigate("profile", {
      id: id,
    });
  };

  return { state, dispatch, navigateToProfile, retry, loadMoreComments };
};

export default useComments;
