import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
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

const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  const { currentAuthState, user } = useAuthContext();
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
              <Stack.Screen name="signup" component={Signup} />
              <Stack.Screen name="test" component={TestScreen1} />
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

[
  { category: "Landscape" },
  { category: "Cars" },
  { category: "Landscape" },
  { category: "3D Renders" },
  { category: "Food" },
  { category: "Landscape" },
  { category: "Fashion & Beauty" },
];
