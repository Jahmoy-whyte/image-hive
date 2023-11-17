import { useEffect, useReducer, useRef, useState } from "react";
import { showToast } from "../utils/toastLib";
import {
  fb_addComment,
  fb_getComments,
} from "../services/firebase/functions/comments_subCollection";

const useCommentModel = (imageId, userId) => {
  const textBoxRef = useRef();
  const initialState = {
    modelTextBox: "",
    lastVisibleDoc: null,
    modelVisible: false,
    comments: [],
    isLoading: true,
    isLoadingMore: false,
    error: null,
    isDocEnd: false,
  };

  const ACTIONS = {
    set_modelTextBox: "set_modelTextBox",
    set_modelVisible: "set_modelVisible",
    set_comments_and_lastVisibleDoc: "set_comments_and_lastVisibleDoc",
    set_isLoading: "set_isLoading",
    set_isLoadingMore: "set_isLoadingMore",
    set_error: "set_error",
    set_isDocEnd: "set_isDocEnd",
    reset_state: "reset_state",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "set_comments_and_lastVisibleDoc": {
        const comments = action.payload.comments;
        const lastVisibleDoc = action.payload.lastVisibleDoc;
        return {
          ...state,
          comments: [...state.comments, ...comments],
          lastVisibleDoc: lastVisibleDoc,
          isLoading: false,
          isLoadingMore: false,
        };
      }
      case "set_isDocEnd":
        return { ...state, isDocEnd: action.payload };

      case "set_isLoadingMore":
        return { ...state, isLoadingMore: action.payload };

      case "set_error":
        return { ...state, error: action.payload };
      case "reset_state":
        return initialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const addComment = async () => {
    try {
      await fb_addComment(imageId, userId, modelData.textBox);
    } catch (error) {
      showToast().error("", "error occourred adding comment");
    }
  };

  const resetState = () => {
    dispatch({
      type: ACTIONS.reset_state,
    });
  };

  const getComments = async (LimitNumber = 1) => {
    try {
      const { lastVisible, commentsArray } = await fb_getComments(
        imageId,
        LimitNumber
      );

      dispatch({
        type: ACTIONS.set_comments_and_lastVisibleDoc, //sets  comments ,  lastVisibleDoc , isLoading to false and isLoadingMoreComments to false
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

  const loadMoreComments = async (LimitNumber = 1) => {
    if (state.isLoading || state.isLoadingMore || state.isDocEnd) return;

    // show loading inicator
    dispatch({ type: ACTIONS.isLoadingMore, payload: true });

    try {
      const { lastVisible, commentsArray } = await fb_loadMoreComments(
        imageId,
        LimitNumber,
        state.lastVisibleDoc
      );

      if (!lastVisible)
        // if lastlvisibile is falsy set doc end to true
        dispatch({
          type: ACTIONS.set_isDocEnd,
          payload: true,
        });

      dispatch({
        type: ACTIONS.set_comments_and_lastVisibleDoc, //sets  comments ,  lastVisibleDoc , isLoading to false and isLoadingMoreComments to false
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

  return {
    addComment,
    loadMoreComments,
    getComments,
    resetState,
    state: {
      modelTextBox: state.modelTextBox,
      lastVisibleDoc: state.lastVisibleDoc,
      modelVisible: state.modelVisible,
      comments: state.comments,
      isLoading: state.isLoading,
      isLoadingMore: state.isLoadingMore,
      error: state.error,
      isDocEnd: state.isDocEnd,
    },
  };
};

export default useCommentModel;
