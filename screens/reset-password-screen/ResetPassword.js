import { SafeAreaView, View, Text, ScrollView, Image } from "react-native";
import SafeContainer from "../../components/SafeContainer";
import { AntDesign } from "@expo/vector-icons";
import backgroundIcon from "../../assets/images/backgroundIcon.png";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import TextBox from "../../components/TextBox";
import Button from "../../components/Button";
import Checkbox from "expo-checkbox";
import AuthStackHeading from "../../components/AuthStackHeading";
const ResetPassword = () => {
  return (
    <>
      <ExpoStatusBar style="light" />
      <View className="absolute flex-1 bg-primary w-screen h-screen"></View>
      <SafeContainer>
        <ScrollView className="flex-1">
          <AuthStackHeading heading="Reset Password" />

          <View className="p-3 " style={{ gap: 16 }}>
            <View className="">
              <Text className="font-interBold text-sm">Instruction</Text>
              <Text className="font-interRegular text-sm">
                Please enter your email account to receive verification link to
                reset your password
              </Text>
            </View>
            <TextBox label="Email" placeHolder="Please enter your email" />

            <Button text="Send Link" />
          </View>
        </ScrollView>
      </SafeContainer>
    </>
  );
};

export default ResetPassword;
