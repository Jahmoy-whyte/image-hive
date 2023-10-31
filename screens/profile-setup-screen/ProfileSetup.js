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
const ProfileSetup = ({ navigation }) => {
  return (
    <>
      <ExpoStatusBar style="light" />
      <View className="absolute flex-1 bg-primary w-screen h-screen"></View>
      <SafeContainer>
        <ScrollView className="flex-1">
          <AuthStackHeading heading="Profile Setup" />

          <View className="px-3 py-5 " style={{ gap: 16 }}>
            <View className=" flex-row items-center">
              <TouchableOpacity className="border-[1px] border-gray-300 rounded-full w-14 h-14 justify-center items-center">
                {null ? (
                  <Image source={null} />
                ) : (
                  <AntDesign name="plus" size={30} color="black" />
                )}
              </TouchableOpacity>

              <View className="flex-1 ml-3">
                <Text className="font-interRegular text-sm">
                  Please enter a username and image
                </Text>
                <Text className="font-interBold text-sm">
                  Note:
                  <Text className="font-interRegular text-sm">
                    {" "}
                    image is optional
                  </Text>
                </Text>
              </View>
            </View>
            <TextBox label="Username" placeHolder="Please enter a username" />

            <Button text="Done" onPress={() => navigation.navigate("home")} />
          </View>
        </ScrollView>
      </SafeContainer>
    </>
  );
};

export default ProfileSetup;
