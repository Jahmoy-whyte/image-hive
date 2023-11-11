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
  const data = [1, 2, 3];
  return (
    <View className="p-3 bg-slate-50">
      {data.map((text, index) => (
        <View className="flex-row  border-b-[1px] border-b-slate-200 py-3">
          <View className="bg-slate-200 w-8 h-8 rounded-[40px]"></View>
          <View className="flex-1 ml-3">
            <View className="h-4 bg-slate-200 w-1/2"></View>
            <View className="h-20 bg-slate-200 mt-3"></View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default CommentsSkeleton;
