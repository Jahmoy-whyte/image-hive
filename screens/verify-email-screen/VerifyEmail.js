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
import useVerifyEmail from "./useVerifiyEmail";
const VerifyEmail = ({ navigation }) => {
  const { buttonLoading, email, isLoading, sendVerificationLink, verify } =
    useVerifyEmail();
  return (
    <>
      <ExpoStatusBar style="light" />
      <View className="absolute flex-1 bg-primary w-screen h-screen"></View>
      <SafeContainer>
        <ScrollView className="flex-1">
          <AuthStackHeading heading="Verify Email" />
          <View style={{ gap: 16, padding: 12 }}>
            <View className="">
              <Text className="font-interBold text-sm">Instruction</Text>
              <Text className="font-interRegular text-sm">
                Email as been sent to
                <Text className="font-interBold text-sm"> {email} </Text>
                please open your email and click on the link to verify your
                email.
              </Text>
            </View>

            <Button text="Verify" isLoading={buttonLoading} onPress={verify} />
          </View>
        </ScrollView>

        <Text className="font-interRegular text-sm text-center mb-5">
          Not seeing link
          <Text
            onPress={() => sendVerificationLink()}
            className="font-interBold text-sm text-primary"
            disabled={isLoading}
          >
            {isLoading ? "..loading" : " Resend"}
          </Text>
        </Text>
      </SafeContainer>
    </>
  );
};

export default VerifyEmail;
