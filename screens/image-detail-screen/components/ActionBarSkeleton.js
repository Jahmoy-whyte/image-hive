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
const ActionBarSkeleton = () => {
  return (
    <View className="p-3 bg-slate-50">
      <View className="h-4 bg-slate-200 w-1/2"></View>
      <View className="flex-row items-center justify-between mt-3">
        <View className="flex-row items-center flex-1 mr-2 ">
          <View className="w-10 h-10 rounded-[40px] bg-slate-200"></View>
          <View className="h-4 bg-slate-200 w-1/3 ml-3"></View>
        </View>
        <View className="flex-row justify-end items-center ">
          <View className="bg-slate-200 ml-3 h-4  px-5 py-1 "></View>
          <View className="bg-slate-200 ml-3 h-4  px-5 py-1 "></View>
        </View>
      </View>

      <View className="h-20 bg-slate-200 flex-1 mt-3"></View>
    </View>
  );
};

export default ActionBarSkeleton;
