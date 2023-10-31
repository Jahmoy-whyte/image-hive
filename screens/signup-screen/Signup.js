import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import SafeContainer from "../../components/SafeContainer";
import { AntDesign } from "@expo/vector-icons";
import backgroundIcon from "../../assets/images/backgroundIcon.png";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import TextBox from "../../components/TextBox";
import Button from "../../components/Button";
import Checkbox from "expo-checkbox";
import AuthStackHeading from "../../components/AuthStackHeading";
import useSignUp from "./useSignUp";
const Signup = ({ navigation }) => {
  const { createUser, setTextBoxValue, textBoxValue } = useSignUp();
  return (
    <>
      <ExpoStatusBar style="light" />
      <View className="absolute flex-1 bg-primary w-screen h-screen"></View>
      <SafeContainer>
        <ScrollView className="flex-1">
          <AuthStackHeading
            heading="Sign Up"
            subHeading="Please Sign Up To Continue"
          />

          <View className="p-3 " style={{ gap: 12 }}>
            <TextBox label="Email" placeHolder="Please enter your email" />
            <TextBox label="Password" placeHolder="Please enter a password" />

            <View className="flex-1 flex-row gap-2 items-center ">
              <Checkbox />
              <Text className="flex-wrap flex-1 font-interRegular text-sm">
                Tap Here To Read About Our{" "}
                <Text className="font-interBold text-primary">
                  Privacy Policy
                </Text>
              </Text>
            </View>

            <Button text="Sign up" onPress={() => createUser()} />
          </View>
        </ScrollView>
      </SafeContainer>
    </>
  );
};

export default Signup;
