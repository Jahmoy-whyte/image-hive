import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
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

const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen name="landing" component={LandingScreen} />
          <Stack.Screen name="signup" component={Signup} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="select-categories" component={SelectCategories} />
          <Stack.Screen name="reset-password" component={ResetPassword} />
          <Stack.Screen name="verify-email" component={VerifyEmail} />
          <Stack.Screen name="profile-setup" component={ProfileSetup} />
          <Stack.Screen name="home" component={Home} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
