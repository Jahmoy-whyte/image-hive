import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { showToast } from "../utils/toastLib";
import {
  fb_addComment,
  fb_deleteComment,
  fb_getComments,
  fb_loadMoreComments,
} from "../services/firebase/functions/comments_subCollection";
import { useAuthContext } from "../context/AuthContextProvider";

const useCommentModel = (imageId) => {
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
    addComment: "addComment",
    deleteComment: "deleteComment",
    updateComment: "updateComment",
    set_comments: "set_comments",
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

      case "set_comments": {
        return {
          ...state,
          comments: action.payload,
        };
      }

      case "addComment": {
        const comment = action.payload; // is a obj with { comment, userId, timeStamp }
        return {
          ...state,
          modelTextBox: "",
          comments: [comment, ...state.comments],
        };
      }

      case "deleteComment": {
        const timeStamp = action.payload; // is a obj with { comment, userId, timeStamp }
        return {
          ...state,
          modelTextBox: "",
          comments: state.comments.filter(
            (comment) => comment.timeStamp != timeStamp
          ),
        };
      }

      case "updateComment": {
        const commentData = action.payload; // is a obj with { comment, userId, timeStamp }
        return {
          ...state,
          modelTextBox: "",
          comments: state.comments.map((comment) => {
            return comment.userId + comment.timeStamp ==
              commentData.userId + commentData.timeStamp
              ? { ...comment, comment: commentData.comment }
              : comment;
          }),
        };
      }

      case "set_modelTextBox":
        return { ...state, modelTextBox: action.payload };

      case "set_modelVisible":
        return { ...state, modelVisible: action.payload, modelTextBox: "" };

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
  const { user } = useAuthContext();

  /*
comment
timeStamp
userId
*/

  const addComment = async () => {
    const prevCommentArray = [...state.comments]; // make a copy  of the current array
    try {
      // add user comment to the array
      dispatch({
        type: ACTIONS.addComment,
        payload: {
          comment: state.modelTextBox,
          userId: user.id,
          timeStamp: Date.now(),
        },
      });
      // send user comment to the database
      await fb_addComment(imageId, user.id, state.modelTextBox);
    } catch (error) {
      showToast().error("", "error occourred adding comment");
      // in case of error revert comment array to the copied array
      dispatch({
        type: ACTIONS.set_comments,
        payload: prevCommentArray,
      });
    }
  };

  const deleteComment = useCallback(async (timeStamp) => {
    const prevCommentArray = [...state.comments]; // make a copy  of the current array
    try {
      // delete comment from array
      dispatch({
        type: ACTIONS.deleteComment,
        payload: timeStamp,
      });
      // delete user comment to the database
      //  await fb_deleteComment(imageId, user.id, state.modelTextBox);
    } catch (error) {
      showToast().error("", "error occourred deleting comment");
      // in case of error revert comment array to the copied array
      dispatch({
        type: ACTIONS.set_comments,
        payload: prevCommentArray,
      });
    }
  }, []);

  const updateComment = async (userId, timeStamp, comment) => {
    const prevCommentArray = [...state.comments]; // make a copy  of the current array
    try {
      // delete comment from array
      dispatch({
        type: ACTIONS.updateComment,
        payload: {
          userId: userId,
          timeStamp: timeStamp,
          comment: comment,
        },
      });
      // delete user comment to the database
      //  await fb_deleteComment(imageId, user.id, state.modelTextBox);
    } catch (error) {
      showToast().error("", "error occourred updating comment");
      // in case of error revert comment array to the copied array
      dispatch({
        type: ACTIONS.set_comments,
        payload: prevCommentArray,
      });
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
    dispatch({ type: ACTIONS.set_isLoadingMore, payload: true });

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

  const setModelTextBox = (value) => {
    dispatch({ type: ACTIONS.set_modelTextBox, payload: value });
  };

  const setModelVisible = (value) => {
    dispatch({ type: ACTIONS.set_modelVisible, payload: value }); // sets  modelVisible and modelTextBox to empty string
  };

  return {
    setModelTextBox,
    setModelVisible,
    addComment,
    loadMoreComments,
    getComments,
    resetState,
    deleteComment,
    updateComment,
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
