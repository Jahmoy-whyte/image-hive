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
import { fakerEN, fakerZH_TW } from "@faker-js/faker";

const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  const { currentAuthState, user } = useAuthContext();

  const click = () => {
    let data = [];
    for (let i = 0; i < 10; i++) {
      const username = faker.person.fullName();
      const bio = faker.person.bio();
      const categories = ["Landscape", "3D Renders", "Food"];
      const id = "myid";
      const profileImage = faker.image.urlPicsumPhotos();

      const testdata = {
        username: username,
        bio: bio,
        categories: categories,
        id: id,
        profileImage: profileImage,
        timeStamp: "",
      };
      data.push(testdata);
    }

    console.log(data);
  };

  const Myscreen = () => {
    return (
      <>
        <SafeContainer>
          <View style={{ flex: 1, backgroundColor: "blue" }}>
            <Text>hello there</Text>

            <Button title="click" onPress={() => click()} />
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
