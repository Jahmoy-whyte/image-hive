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
import TextBox from "../../../components/TextBox";
const Comments = ({ profileImage, username, title, description }) => {
  const data = [
    {
      name: "William Make",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris.",
    },
    {
      name: "William Make",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris.",
    },
    {
      name: "William Make",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris.",
    },
    {
      name: "William Make",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna ac placerat vestibulum lectus mauris.",
    },
  ];
  return (
    <View className="p-3">
      <Text className="font-interBold text-lg">Comments(20) </Text>
      {data.map((text, index) => (
        <View className="flex-row  border-b-[1px] border-b-gray-300 py-3">
          <Image source={testimage} className="w-8 h-8 rounded-[40px]" />
          <View className="flex-1 ml-3">
            <Text className="text-xs font-bold">{text.name}</Text>
            <Text className="text-xs font-interRegular">{text.text}</Text>
          </View>
        </View>
      ))}

      <Text className="font-interBold text-xs text-primary my-3">
        View All comments
      </Text>
      <TextBox />
    </View>
  );
};

export default Comments;
