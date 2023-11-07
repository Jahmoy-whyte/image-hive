import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
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
import CategoryBubble from "./components/CategoryBubble";
import { FontAwesome } from "@expo/vector-icons";

import testimage from "../../assets/images/testimage.png";

const Home = ({ navigation }) => {
  const { user } = useHome();

  const test = [
    { image: testimage },
    { image: testimage },
    { image: testimage },
    { image: testimage },
    { image: testimage },
    { image: testimage },
    { image: testimage },
    { image: testimage },
  ];
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

          <View className="flex-row my-3  border-gray-300 border-[1px] px-3 min-h-[46px] rounded-3xl items-center">
            <AntDesign name="search1" size={20} color="black" />
            <Text className="ml-2 text-xs">Search For Your Car Parts</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <CategoryBubble
              text={"Explore"}
              categoryStyle={"bg-primary border-none"}
              textStyle={"ml-2 text-white"}
            >
              <FontAwesome name="wpexplorer" size={20} color="white" />
            </CategoryBubble>

            {user.categories.map((text) => (
              <CategoryBubble text={text} />
            ))}
          </ScrollView>

          {test.map((wdw, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("image-detail")}
                className="h-64 overflow-hidden rounded-lg mt-3 bg-slate-100-100"
              >
                <Image
                  source={testimage}
                  resizeMode="cover"
                  className="h-64 w-full"
                />
                <View className="flex-row  items-center p-3 absolute bg-black bg-blackOpacity z-10 w-full bottom-0 overflow-hidden">
                  <Image
                    source={testimage}
                    resizeMode="contain"
                    className="w-10 h-10 rounded-[40px]"
                  />
                  <View className="ml-3">
                    <Text className="font-interBold text-xs text-white">
                      The Great Building
                    </Text>
                    <Text className="font-interRegular   text-xs text-white">
                      by:maddie
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeContainer>
    </>
  );
};

export default Home;
