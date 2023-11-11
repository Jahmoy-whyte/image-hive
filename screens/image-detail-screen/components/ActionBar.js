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
/*
 profileImage,
  username,
  title,
  description,
  likes,
  views,
*/
const ActionBar = ({ state }) => {
  return (
    <View className="p-3 bg-black ">
      <Text className="text-white text-lg font-bold mb-3">{state.title} </Text>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1 mr-2">
          <Image
            source={{ uri: state.profileData.profileImage }}
            className="w-10 h-10 rounded-[40px]"
          />
          <Text className="text-white font-interRegular text-xs ml-3">
            By: {state.profileData.username}
          </Text>
        </View>
        <View className="flex-row items-center  ml-10">
          <AntDesign name="like2" size={24} color="white" />
          <TouchableOpacity className={`bg-white ml-3 rounded-2xl px-5 py-1`}>
            <Text className="font-interRegular text-xs">
              {state.isFollowing ? "yes" : "Follow"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row my-3">
        <View className="flex-row items-center mr-3">
          <AntDesign name="eyeo" size={24} color="white" />
          <Text className="text-white text-xs font-interRegular ml-2">
            {state.views}
          </Text>
        </View>
        <View className="flex-row items-center mr-3">
          <AntDesign name="like2" size={24} color="white" />
          <Text className="text-white text-xs font-interRegular ml-2">
            {state.likes}
          </Text>
        </View>
      </View>

      <Text className="text-white text-xs font-interRegular ">
        {state.description}
      </Text>
    </View>
  );
};

export default ActionBar;

/*
const wdwd = {
  categories: ["3D Renders", "Food", "cars"],
  description:
    "Nostrum validus vigor vicissitudo villa ait amoveo tondeo turpis.",
  id: "IvrfF8MlxhGipyX6uKZ3",
  images: [
    "https://picsum.photos/seed/PbQmD/640/480",
    "https://picsum.photos/seed/8NaljD/640/480",
  ],
  isError: null,
  isFollowing: false,
  isLoadingComments: true,
  isLoadingProfile: false,
  isSaved: false,
  likes: 0,
  profileData: {
    bio: "filmmaker, engineer, nerd",
    categories: ["cars", "Food", "Landscape"],
    id: "01d72548-37eb-4125-88af-2191660e965b",
    profileImage:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/332.jpg",
    timeStamp: [Object],
    username: "Alan Doyle MD",
  },
  timeStamp: { nanoseconds: 915000000, seconds: 1699643320 },
  title: "viscus depromo",
  userId: "01d72548-37eb-4125-88af-2191660e965b",
  view: 0,
};
*/
