import { Text, TouchableOpacity } from "react-native";

const CategoryBubble = ({
  text,
  onPress,
  categoryStyle,
  children,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row  items-center border-[1px] border-gray-300 mr-3 px-3 py-1 rounded-3xl ${categoryStyle}`}
    >
      {children}
      <Text className={`font-interRegular text-xs ${textStyle}`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CategoryBubble;
