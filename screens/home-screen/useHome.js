import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContextProvider";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { doc, getDoc, query, limit, orderBy } from "firebase/firestore";

const useHome = () => {
  const { user } = useAuthContext();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "published"), limit(4), orderBy("timeStamp"))
      );
      let arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
      });

      getuser(arr);
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

    getData();
  }, []);
  return { user, data };
};

export default useHome;
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
