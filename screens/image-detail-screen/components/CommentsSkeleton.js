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
const CommentsSkeleton = ({ profileImage, username, title, description }) => {
  return (
    <View className="p-3">
      <View className="bg-slate-200   p-3  rounded-md  min-h-[144px] "></View>

      <View className="justify-center bg-slate-200  border-slate-100 border-[1px] px-3 min-h-[46px] rounded-3xl my-3"></View>
    </View>
  );
};

export default CommentsSkeleton;
