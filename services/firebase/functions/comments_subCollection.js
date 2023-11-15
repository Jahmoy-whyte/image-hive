import {
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const fb_getComments = async (imageId, limitNumber = 1) => {
  const q = query(
    collection(db, "published", imageId, "comments"),
    orderBy("timeStamp"),
    limit(limitNumber)
  );

  const querySnapshot = await getDocs(q);
  const commentsArray = [];
  querySnapshot.forEach((doc) => {
    commentsArray.push({ id: doc.id, ...doc.data() });
  });
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  return { lastVisible, commentsArray };
};

export const fb_loadMoreComments = async (
  imageId,
  limitNumber = 1,
  lastVisibleDoc
) => {
  const q = query(
    collection(db, "published", imageId, "comments"),
    limit(limitNumber),
    orderBy("timeStamp"),
    startAfter(lastVisibleDoc)
  );

  const querySnapshot = await getDocs(q);
  const commentsArray = [];
  if (querySnapshot.empty) return { lastVisible: null, commentsArray };

  querySnapshot.forEach((doc) => {
    commentsArray.push({ id: doc.id, ...doc.data() });
  });

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  return { lastVisible, commentsArray };
};

export const fb_addComment = async (imageId, userId, comment) => {
  const docRef = await addDoc(
    collection(db, "published", imageId, "comments"),
    {
      userId: userId,
      comment: comment,
      timeStamp: serverTimestamp(),
    }
  );
};
