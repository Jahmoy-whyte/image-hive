import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import SafeContainer from "../../components/SafeContainer";
import { AntDesign } from "@expo/vector-icons";
import backgroundIcon from "../../assets/images/backgroundIcon.png";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import TextBox from "../../components/TextBox";
import Button from "../../components/Button";
import Checkbox from "expo-checkbox";
import profilePlaceHolder from "../../assets/images/profilePlaceHolder.png";
import useHome from "./useHome";
const Home = () => {
  const { user } = useHome();
  return (
    <>
      <SafeContainer>
        <ScrollView className="flex-1 p-3">
          <View className="flex-row justify-between ">
            <View className="flex-1">
              <Text className="font-interBold text-3xl">Welcome</Text>
              <Text className="font-interBold text-3xl">
                Back {user.username.split(" ")[0]}!
              </Text>
            </View>

            <Image
              className="w-10 h-10 rounded-[40px]"
              source={
                user.profileImage
                  ? { uri: user.profileImage }
                  : profilePlaceHolder
              }
            />
          </View>

          <View className="flex-row my-3 border-gray-300 border-[1px] px-3 min-h-[46px] rounded-3xl items-center">
            <AntDesign name="search1" size={20} color="black" />
            <TextInput
              className="ml-3"
              placeholder="Search For Your Car Parts"
            />
          </View>
        </ScrollView>
      </SafeContainer>
    </>
  );
};

export default Home;
