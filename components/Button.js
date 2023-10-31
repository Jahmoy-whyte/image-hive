import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";

const Button = ({
  buttonStyle = null,
  textStyle = null,
  text = "",
  isLoading,
  isDisabled,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={isDisabled || isLoading}
      onPress={onPress}
      className={`bg-primary justify-center items-center rounded-3xl min-h-[46] py-1  ${buttonStyle}`}
    >
      <Text className={`text-white font-interBold text-sm ${textStyle}`}>
        {isLoading ? "loading" : text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
