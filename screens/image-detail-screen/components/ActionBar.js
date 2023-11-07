import {
  ScrollView,
  View,
  Image,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import testimage from "../../../assets/images/testimage.png";
const ActionBar = ({
  profileImage,
  username,
  title,
  description,
  likes,
  views,
}) => {
  return (
    <View className="p-3 bg-black">
      <Text className="text-white text-lg font-bold mb-3">The Colosseum </Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1 mr-2">
          <Image source={testimage} className="w-10 h-10 rounded-[40px]" />
          <Text className="text-white font-interRegular text-xs ml-3">
            By: Angle
          </Text>
        </View>
        <View className="flex-row items-center  ml-10">
          <AntDesign name="like2" size={24} color="white" />
          <TouchableOpacity className={`bg-white ml-3 rounded-2xl px-5 py-1`}>
            <Text className="font-interRegular text-xs">Follow</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1 items-center flex-row my-4">
        <View className="flex-row items-center mr-3">
          <AntDesign name="eyeo" size={24} color="white" />
          <Text className="text-white text-xs font-interRegular ml-2">200</Text>
        </View>
        <View className="flex-row items-center mr-3">
          <AntDesign name="like2" size={24} color="white" />
          <Text className="text-white text-xs font-interRegular ml-2">20</Text>
        </View>
      </View>

      <Text className="text-white text-xs font-interRegular ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat
        vestibulum lectus mauris.
      </Text>
    </View>
  );
};

export default ActionBar;
