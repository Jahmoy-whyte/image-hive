import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LandingScreen from "./screens/landing-screen/LandingScreen";

import Signup from "./screens/signup-screen/Signup";
import Login from "./screens/login-screen/Login";
import SelectCategories from "./screens/select-categories-screen/SelectCategories";
import ResetPassword from "./screens/reset-password-screen/ResetPassword";
import VerifyEmail from "./screens/verify-email-screen/VerifyEmail";
import Home from "./screens/home-screen/Home";
import ProfileSetup from "./screens/profile-setup-screen/ProfileSetup";
import { toastConfig } from "./utils/toastLib";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import LoadingIndicator from "./components/LoadingIndicator";
import AuthContextProvider, {
  useAuthContext,
  AUTH_STATES,
} from "./context/AuthContextProvider";
import { TestScreen1 } from "./TestScreenb";
import BottomTabs from "./screens/bottom-tabs/BottomTabs";
import SafeContainer from "./components/SafeContainer";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import ImageDetail from "./screens/image-detail-screen/ImageDetail";
import NavTest from "./screens/NavTest";
import { AScreen } from "./screens/a1/AScreen";
import { BScreen } from "./screens/b1/BScreen";

import { faker } from "@faker-js/faker";
import { TouchableOpacity } from "react-native";
import { doc, setDoc } from "firebase/firestore";

import { serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

import { collection, getDocs, addDoc } from "firebase/firestore";

const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  const { currentAuthState, user } = useAuthContext();

  const randomid = () => {
    var chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");
    let id = "";
    chars.forEach(() => {
      const num = Math.round(Math.random() * chars.length);
      id += chars[num];
    });
    return id + "" + Date.now();
  };

  const getRandomCategories = () => {
    const array = [
      "Landscape",
      "3D Renders",
      "Food",
      "cars",
      "Fashion & Beauty",
    ];
    let newarray = [];
    let length = 3;
    let prevNumber = [];
    for (let i = 0; i < length; i++) {
      const rndnum = Math.round(Math.random() * 4);
      if (prevNumber.includes(rndnum)) {
        length++;

        continue;
      }
      prevNumber.push(rndnum);
      newarray.push(array[rndnum]);
    }

    return newarray;
  };

  const addusers = async () => {
    return;
    let data = [];
    for (let i = 0; i < 10; i++) {
      const username = faker.person.fullName();
      const bio = faker.person.bio();
      const categories = getRandomCategories();
      const id = faker.string.uuid();
      const profileImage = faker.internet.avatar();

      const testdata = {
        username: username,
        bio: bio,
        categories: categories,
        id: id,
        profileImage: profileImage,
        timeStamp: serverTimestamp(),
      };
      await setDoc(doc(db, "users", id), testdata);
    }

    console.log("DONE");
  };

  const addimages = async () => {
    let data = [];
    return;
    let users = [];

    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      users.push(doc.id);
    });

    for (let i = 0; i < users.length - 1; i++) {
      const images =
        Math.round(Math.random()) > 0
          ? [faker.image.urlPicsumPhotos(), faker.image.urlPicsumPhotos()]
          : [faker.image.urlPicsumPhotos()];
      const title = faker.lorem.words({ min: 2, max: 2 });
      const categories = getRandomCategories();
      const likes = 0;
      const views = 0;
      const userId = users[i];
      const description = faker.lorem.sentence({ min: 8, max: 15 });

      const testdata = {
        userId,
        images,
        title,
        categories,
        likes,
        view,
        description,
        timeStamp: serverTimestamp(),
      };

      //data.push(testdata);
      await addDoc(collection(db, "published"), testdata);
    }
    console.log("DONE");
    console.log(data);
  };

  const addComments = async () => {
    let data = [];
    let users = [];
    let images = [];

    const querySnapshot1 = await getDocs(collection(db, "users"));
    querySnapshot1.forEach((doc) => {
      users.push(doc.id);
    });

    const querySnapshot2 = await getDocs(collection(db, "published"));
    querySnapshot2.forEach((doc) => {
      images.push(doc.id);
    });

    for (let i = 0; i < 1; i++) {
      for (const user of users) {
        const userId = user;
        const comment = faker.lorem.sentence({ min: 10, max: 25 });
        const testdata = {
          userId,
          comment,
          timeStamp: serverTimestamp(),
        };

        await addDoc(
          collection(db, "published", images[i], "comments"),
          testdata
        );
      }
    }
    console.log("DONE");
  };

  const Myscreen = () => {
    return (
      <>
        <SafeContainer>
          <View style={{ flex: 1, backgroundColor: "blue" }}>
            <Text>hello there</Text>

            <Button title="add users" onPress={() => addusers()} />
            <Text>hello there</Text>
            <Button
              title="add images"
              onPress={() => addimages()}
              color={"gray"}
            />
            <Text>hello there</Text>
            <Button
              title="add comments"
              onPress={() => addComments()}
              color={"green"}
            />
          </View>
        </SafeContainer>
      </>
    );
  };
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {currentAuthState === AUTH_STATES.signedOut ? (
            <Stack.Group>
              <Stack.Screen name="landing" component={LandingScreen} />
              <Stack.Screen name="signup" component={Signup} />
              <Stack.Screen name="login" component={Login} />
              <Stack.Screen name="verify-email" component={VerifyEmail} />
              <Stack.Screen name="reset-password" component={ResetPassword} />
            </Stack.Group>
          ) : currentAuthState === AUTH_STATES.signedIn ? (
            <Stack.Group>
              <Stack.Screen name="bottom-tabs" component={BottomTabs} />
              <Stack.Screen name="image-detail" component={ImageDetail} />
              <Stack.Screen name="signup" component={Myscreen} />
              <Stack.Screen name="test" component={TestScreen1} />
              <Stack.Screen name="a" component={AScreen} />
              <Stack.Screen name="b" component={BScreen} />
              <Stack.Screen name="bottom-tabs1" component={NavTest} />
            </Stack.Group>
          ) : currentAuthState === AUTH_STATES.profileSetup ? (
            <Stack.Group>
              <Stack.Screen name="profile-setup" component={ProfileSetup} />
              <Stack.Screen
                name="select-categories"
                component={SelectCategories}
              />
            </Stack.Group>
          ) : null}
        </Stack.Navigator>
      </NavigationContainer>

      <Toast config={toastConfig} />
    </>
  );
}
///          <Stack.Screen name="profile-setupw" component={TestScreen1} />
//   <Stack.Screen name="bottom-tabs2" component={NavTest} />
[
  { category: "Landscape" },
  { category: "Cars" },
  { category: "Landscape" },
  { category: "3D Renders" },
  { category: "Food" },
  { category: "Landscape" },
  { category: "Fashion & Beauty" },
];
[
  {
    categories: ["cars", "Fashion & Beauty", "Food"],
    image: "https://picsum.photos/seed/iUNV56e1rf/640/480",
    likes: 0,
    timeStamp: { _methodName: "serverTimestamp" },
    title: "antea adaugeo",
    userId:
      "7Btf92TNGk89f7DXETpxBbZOzgDVAPZEmWoXchPccz99xcUXzd5JxEF28d0a41699546369213",
    view: 0,
  },
  {
    categories: ["Fashion & Beauty", "3D Renders", "Food"],
    image: "https://picsum.photos/seed/aQPnVd/640/480",
    likes: 0,
    timeStamp: { _methodName: "serverTimestamp" },
    title: "vacuus tyrannus",
    userId:
      "7hWnvlGLCF483bWmR2B7JrihKH9zlU8lh92EW6m6yd8mTGNoyDt90metN0OCg1699546369042",
    view: 0,
  },
  {
    categories: ["Fashion & Beauty", "3D Renders", "Food"],
    image: "https://picsum.photos/seed/ziDMT/640/480",
    likes: 0,
    timeStamp: { _methodName: "serverTimestamp" },
    title: "depono summopere",
    userId:
      "7mnT6w6O9uJm9g8XWrafwkiU3SZCEgw6QCZkkDdZENBycPmi3LTNuewyW7t2r1699546370318",
    view: 0,
  },
  {
    categories: ["cars", "Food", "3D Renders"],
    image: "https://picsum.photos/seed/gZ05y9HsN/640/480",
    likes: 0,
    timeStamp: { _methodName: "serverTimestamp" },
    title: "volaticus aufero",
    userId: "8SYALS9TdiT1b48GzCHSC1eQI4B3",
    view: 0,
  },
  {
    categories: ["Food", "3D Renders", "Landscape"],
    image: "https://picsum.photos/seed/DbWqg/640/480",
    likes: 0,
    timeStamp: { _methodName: "serverTimestamp" },
    title: "varius clarus",
    userId:
      "9T8undefineduICW5ETQoP9AugIRK6D6BmE0DW6LB6GQnMDNHIffunwBTGWSh25WelAiX1699546369979",
    view: 0,
  },
  {
    categories: ["Fashion & Beauty", "Landscape", "3D Renders"],
    image: "https://picsum.photos/seed/qezbZXACT/640/480",
    likes: 0,
    timeStamp: { _methodName: "serverTimestamp" },
    title: "tardus sollicito",
    userId:
      "I8Xm2bh3bxEk3Uo4doPDBIZXSA0rHmxundefineduQqhWqbn1UnH77mLBz4SGv6vN3o5a1699546367993",
    view: 0,
  },
  {
    categories: ["Fashion & Beauty", "Food", "cars"],
    image: "https://picsum.photos/seed/tkislmM3b1/640/480",
    likes: 0,
    timeStamp: { _methodName: "serverTimestamp" },
    title: "apto cuppedia",
    userId: "SKxi5Hy4rLU4gW68GVZXPcElmnC2",
    view: 0,
  },
  {
    categories: ["3D Renders", "cars", "Food"],
    image: "https://picsum.photos/seed/4Fan9c/640/480",
    likes: 0,
    timeStamp: { _methodName: "serverTimestamp" },
    title: "conitor comptus",
    userId:
      "ScUBmpThWH67nyncfdQMqxlXq16PuJGXbR3BEy9XLfftfDqH8ltb4ZPkGSV8r1699546368838",
    view: 0,
  },
  {
    categories: ["3D Renders", "Fashion & Beauty", "Food"],
    image: "https://picsum.photos/seed/5prbO5ri/640/480",
    likes: 0,
    timeStamp: { _methodName: "serverTimestamp" },
    title: "dedecor nisi",
    userId:
      "Xdlud5pZh3S4l4S37HAKTNn6OeWT7ylvnsyTZc47Vd2aqxUhu06OpXqOvCqcw1699546369790",
    view: 0,
  },
  {
    categories: ["Landscape", "Food", "cars"],
    image: "https://picsum.photos/seed/Phj4H/640/480",
    likes: 0,
    timeStamp: { _methodName: "serverTimestamp" },
    title: "adiuvo dolorum",
    userId:
      "XvKctoCFn6iyTzUwOIwX5sr1IzbLuZK8LxvkISbiluyJcZct17X3rzlHXdDov1699546370134",
    view: 0,
  },
  {
    categories: ["3D Renders", "Food", "Landscape"],
    image: "https://picsum.photos/seed/sI2Po81mFU/640/480",
    likes: 0,
    timeStamp: { _methodName: "serverTimestamp" },
    title: "subnecto damnatio",
    userId:
      "eIwX4eLLFI7sDxHzS62sNAD1T9g0lREZ4bw3MKmKzXM594Og0oUFe0iffQwHB1699546369386",
    view: 0,
  },
];
