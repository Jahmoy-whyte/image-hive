import { ActivityIndicator, View } from "react-native";

const LoadingIndicator = () => {
  return (
    <View className="justify-center items-center flex-1 bg-primary">
      <ActivityIndicator size={"large"} color={"white"} />
    </View>
  );
};

export default LoadingIndicator;
