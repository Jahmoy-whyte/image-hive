import { useEffect, useRef, useState } from "react";
import { showToast } from "../utils/toastLib";
import { fb_addComment } from "../services/firebase/functions/comments_subCollection";

const useCommentModel = (imageId, userId) => {
  const textBoxRef = useRef();
  const [modelData, setModelData] = useState({
    textBox: "",
    isLoading: false,
    visible: false,
  });

  useEffect(() => {}, []);

  const addComment = async () => {
    setModelData((prev) => ({
      ...prev,
      isLoading: false,
    }));
    try {
      await fb_addComment(imageId, userId, modelData.textBox);
    } catch (error) {
      showToast().error("", "error occourred adding comment");
    } finally {
      setModelData((prev) => ({
        ...prev,
        textBox: "",
        isLoading: false,
        visible: false,
      }));
    }
  };

  const setTextbox = async () => {};

  return { addComment };
};

export default useCommentModel;
