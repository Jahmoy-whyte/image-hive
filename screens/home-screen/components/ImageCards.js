import { memo } from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";

const ImageCards = ({ data, onPress }) => {
  console.log("wddddddddddddddddddddddddddddd=====d");
  return (
    <TouchableOpacity
      key={data.id}
      onPress={() => onPress(data)}
      className="h-64 overflow-hidden rounded-lg bg-slate-100 mx-3 mb-3"
    >
      <Image
        source={{
          uri: data.images[0],
        }}
        resizeMode="cover"
        className="h-64 w-full"
      />
      <View className="flex-row  items-center p-3 absolute bg-black bg-blackOpacity z-10 w-full bottom-0 overflow-hidden">
        <View className="ml-3">
          <Text className="font-interBold text-xs text-white">
            {data.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ImageCards);
