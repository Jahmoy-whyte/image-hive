import { SafeAreaView, View, Text, TextInput } from "react-native";

const TextBox = ({
  label = "label",
  onChangeText,
  isDisabled,
  isLoading,
  placeHolder = "Please Enter text",
  value = "",
  secureTextEntry = false,
  textBoxContainerStyle = "",
}) => {
  return (
    <View className={`flex-1 ${textBoxContainerStyle}`}>
      <Text className="font-interRegular text-sm mb-1">{label}:</Text>

      <TextInput
        className="border-gray-300 border-[1px] px-3 min-h-[46px] rounded-3xl"
        onChangeText={(value) => onChangeText(value)}
        placeholder={placeHolder}
        value={value}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default TextBox;
