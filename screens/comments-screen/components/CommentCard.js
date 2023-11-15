import { View, Image, Text } from "react-native";

import testimage from "../../../assets/images/testimage.png";

const CommentCard = ({ comment }) => {
  return (
    <View className="flex-row  border-b-[1px] border-b-gray-300 py-3">
      <Image source={testimage} className="w-8 h-8 rounded-[40px]" />
      <View className="flex-1 ml-3">
        <Text className="text-xs font-bold">{"text.name"}</Text>
        <Text className="text-xs font-interRegular">{comment.comment}</Text>
      </View>
    </View>
  );
};

export default CommentCard;
