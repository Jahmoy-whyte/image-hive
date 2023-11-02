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
  const { createUser, setTextBoxValue, textBoxValue, isLoading } = useSignUp();
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
            <TextBox
              isDisabled={isLoading}
              keyboardType="email-address"
              label="Email"
              placeHolder="Please enter your email"
              value={textBoxValue.email}
              onChangeText={(value) =>
                setTextBoxValue((prev) => ({ ...prev, email: value }))
              }
            />
            <TextBox
              isDisabled={isLoading}
              secureTextEntry={true}
              label="Password"
              placeHolder="Please enter a password"
              value={textBoxValue.password}
              onChangeText={(value) =>
                setTextBoxValue((prev) => ({ ...prev, password: value }))
              }
            />

            <View className="flex-1 flex-row gap-2 items-center ">
              <Checkbox
                disabled={isLoading}
                onValueChange={(value) =>
                  setTextBoxValue((prev) => ({ ...prev, checked: value }))
                }
                value={textBoxValue.checked}
                color={textBoxValue.checked ? "#DD133C" : null}
              />
              <Text className="flex-wrap flex-1 font-interRegular text-sm">
                Tap Here To Read About Our{" "}
                <Text className="font-interBold text-primary">
                  Privacy Policy
                </Text>
              </Text>
            </View>

            <Button
              text="Sign up"
              onPress={() => createUser()}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </SafeContainer>
    </>
  );
};

export default Signup;
