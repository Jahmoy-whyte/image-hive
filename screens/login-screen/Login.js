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
const Login = ({ navigation }) => {
  return (
    <>
      <ExpoStatusBar style="light" />
      <View className="absolute flex-1 bg-primary w-screen h-screen"></View>
      <SafeContainer>
        <ScrollView className="flex-1">
          <AuthStackHeading
            heading="Login"
            subHeading="Please Login To Continue"
          />

          <View className="p-3 " style={{ gap: 12 }}>
            <TextBox label="Email" placeHolder="Please enter your email" />
            <TextBox
              label="Password"
              placeHolder="Please enter your password"
            />

            <Text
              className="font-interRegular text-primary my-1 text-center"
              onPress={() => navigation.navigate("reset-password")}
            >
              Forgot password?
            </Text>

            <Button text="Login" />
          </View>
        </ScrollView>
      </SafeContainer>
    </>
  );
};

export default Login;
