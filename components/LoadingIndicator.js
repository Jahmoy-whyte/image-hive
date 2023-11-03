import { ActivityIndicator, View } from "react-native";

const LoadingIndicator = () => {
  return (
    <View className="justify-center items-center flex-1 bg-white">
      <ActivityIndicator size={"large"} color={"black"} />
    </View>
  );
};

export default LoadingIndicator;
