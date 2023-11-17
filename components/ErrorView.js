import backgroundIcon from "../assets/images/backgroundIcon.png";
import { Text, View, Image, TouchableOpacity } from "react-native";
const ErrorView = ({
  message = "An issue occurred please restart",
  onPress = null,
}) => {
  return (
    <View className="justify-center items-center bg-white flex-1 px-3">
      <View className="border-[1px] border-gray-300 p-3 mb-3 rounded-[100px]">
        <Image source={backgroundIcon} className="w-10 h-10 border-2" />
      </View>

      <Text className="font-interMedium text-xs text-center m-3">
        {message}
      </Text>
      {onPress ? (
        <TouchableOpacity
          className="bg-primary px-3 py-2 rounded-lg"
          onPress={onPress}
        >
          <Text className="text-xs text-white">Retry</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ErrorView;
