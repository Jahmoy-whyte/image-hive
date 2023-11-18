import {
  collection,
  getDocs,
  startAfter,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const fb_getinitialImages = async () => {
  const docQuery = query(
    collection(db, "published"),
    limit(4),
    orderBy("timeStamp", "desc")
  );
  const documentSnapshots = await getDocs(docQuery);
  const imageArray = [];
  documentSnapshots.forEach((doc) => {
    imageArray.push({ id: doc.id, ...doc.data() });
  });

  // get last doc from query for pagination
  const lastVisable = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  return { imageArray, lastVisable }; // return intital 4 images and last visiable document for  cursor
};

export const fb_loadMoreImages = async (lastVisibleDoc) => {
  const docQuery = query(
    collection(db, "published"),
    limit(4),
    orderBy("timeStamp", "desc"),
    startAfter(lastVisibleDoc)
  );
  const documentSnapshots = await getDocs(docQuery);
  //if documentSnapshots is empty  set return last visible as null and image array as empty array
  if (documentSnapshots.empty) {
    return { imageArray: [], lastVisable: null };
  }
  const imageArray = [];
  documentSnapshots.forEach((doc) => {
    imageArray.push({ id: doc.id, ...doc.data() });
  });

  // get last doc from query for pagination
  const lastVisable = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  return { imageArray, lastVisable };
};
