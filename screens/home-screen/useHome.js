import { useCallback, useEffect, useReducer, useState } from "react";
import { useAuthContext } from "../../context/AuthContextProvider";

import { showToast } from "../../utils/toastLib";
import { useNavigation } from "@react-navigation/native";
import {
  fb_getinitialImages,
  fb_loadMoreImages,
} from "../../services/firebase/functions/published_collection";

const useHome = () => {
  const { user } = useAuthContext();
  const nav = useNavigation();
  const initialState = {
    isLoading: true,
    imageArray: [],
    isloadingMore: false,
    currentCategory: null,
    lastVisibleDoc: null,
    isDocEnd: false,
    isError: false,
  };

  const ACTIONS = {
    set_is_doc_end: "set_is_doc_end",
    set_is_loading: "set_is_loading",
    set_image_array: "set_image_array",
    set_is_loading_more: "set_is_loading_more",
    set_current_category: "set_current_category",
    set_last_visible_doc: "set_last_visible_doc",
    set_is_error: "set_is_error",

    retry: "retry",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "retry":
        return initialState;
      case "set_is_loading":
        return { ...state, isLoading: action.payload };
      case "set_image_array":
        return {
          ...state,
          imageArray: [...state.imageArray, ...action.payload],
          isLoading: false,
          isloadingMore: false,
        };
      case "set_is_loading_more":
        return { ...state, isloadingMore: action.payload };
      case "set_current_category":
        return { ...state, currentCategory: action.payload };
      case "set_last_visible_doc":
        return { ...state, lastVisibleDoc: action.payload };
      case "set_is_doc_end":
        return {
          ...state,
          isDocEnd: action.payload,
          isloadingMore: false,
          isLoading: false,
        };
      case "set_is_error":
        return {
          ...state,
          isError: action.payload,
          isloadingMore: false,
          isLoading: false,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // get initial on load image
    getinitialImages();
  }, []);

  const retry = () => {
    // reset reducer state to initial state
    dispatch({
      type: ACTIONS.retry,
    });
    getinitialImages();
  };

  const getinitialImages = async () => {
    try {
      const { imageArray, lastVisable } = await fb_getinitialImages();

      //get last doc from query for pagination
      // save lastvisibale in state

      dispatch({ type: ACTIONS.set_last_visible_doc, payload: lastVisable });
      //set image array
      dispatch({ type: ACTIONS.set_image_array, payload: imageArray });
    } catch (error) {
      dispatch({
        type: ACTIONS.set_is_error,
        payload: "error occurred while getting images",
      });
      showToast().error("", error.message);
    }
  };

  const loadMoreImages = async () => {
    if (
      state.isDocEnd ||
      state.isloadingMore ||
      state.isloading ||
      !state.lastVisibleDoc
    )
      return;

    dispatch({ type: ACTIONS.set_is_loading_more, payload: true });

    try {
      const { imageArray, lastVisable } = await fb_loadMoreImages(
        state.lastVisibleDoc
      );
      //if lastvisibale  is null  set isDocEnd to true to avoid unnecessary firebase requests
      if (!lastVisable) {
        dispatch({ type: ACTIONS.set_is_doc_end, payload: true });
        return;
      }
      // save last visibale in state
      dispatch({ type: ACTIONS.set_last_visible_doc, payload: lastVisable });
      //set image array
      dispatch({ type: ACTIONS.set_image_array, payload: imageArray });
    } catch (error) {
      dispatch({
        type: ACTIONS.set_is_error,
        payload: "error occurred while getting images",
      });
      showToast().error("", error.message);
    }
  };

  const navToDetails = useCallback((imageData) => {
    nav.navigate("image-detail", {
      imageData,
    });
  }, []);

  return { user, state, loadMoreImages, navToDetails, retry };
};

export default useHome;

/*
const qdqd = {
  bio: "saffron fan",
  categories: ["Fashion & Beauty", "Food", "cars"],
  id: "aef165c2-db6d-4385-b8a5-47d34dcf5d89",
  image: "https://picsum.photos/seed/bDnu5HAj/640/480",
  imageCategories: ["cars", "Fashion & Beauty", "3D Renders"],
  imageTimeStamp: { nanoseconds: 110000000, seconds: 1699552377 },
  likes: 0,
  profileImage:
    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1005.jpg",
  timeStamp: { nanoseconds: 321000000, seconds: 1699552290 },
  title: "vita copiose",
  userCategories: ["Fashion & Beauty", "Food", "cars"],
  userId: "aef165c2-db6d-4385-b8a5-47d34dcf5d89",
  userJoinDate: { nanoseconds: 321000000, seconds: 1699552290 },
  username: "Lucas Ziemann",
  view: 0,
};




 const getuser = async (arr = []) => {
      let newarr = [];
      for (let i = 0; i < arr.length - 1; i++) {
        const docRef = doc(db, "users", arr[i].userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          newarr.push({
            userCategories: docSnap.data().categories,
            userJoinDate: docSnap.data().timeStamp,
            imageCategories: arr[i].categories,
            imageTimeStamp: arr[i].timeStamp,
            ...arr[i],
            ...docSnap.data(),
          });
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }
      console.log(newarr);
      setData(newarr);
    };

*/
