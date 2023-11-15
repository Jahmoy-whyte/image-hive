import { AntDesign } from "@expo/vector-icons";
import { Touchable, TouchableOpacity } from "react-native";

import { View, Text } from "react-native";
const CustomHeader = ({ children, title = "default", nav }) => {
  return (
    <View className="flex-row min-h-[64] items-center  bg-white border-b-2 border-b-gray-300 ">
      <TouchableOpacity onPress={nav} className="ml-3">
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text className="text-lg font-interBold text-center flex-1 absolute w-full z-[-2] ">
        {title}
      </Text>
      <TouchableOpacity onPress={nav} className="mr-3">
        {children}
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
