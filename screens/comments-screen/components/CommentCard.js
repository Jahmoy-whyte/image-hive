import { View, Image, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import testimage from "../../../assets/images/testimage.png";
import { memo } from "react";

const CommentCard = ({ comment, deleteComment, updateComment, userId }) => {
  console.log("wwwwwwwwwwww");
  return (
    <View className="flex-row  border-b-[1px] border-b-gray-300 py-3">
      <Image source={testimage} className="w-8 h-8 rounded-[40px]" />
      <View className="flex-1 ml-3">
        <Text className="text-xs font-bold">{"text.name"}</Text>
        <Text className="text-xs font-interRegular">{comment.comment}</Text>
      </View>
      {comment.userId === userId ? (
        <View style={{ gap: 10 }}>
          <MaterialIcons
            name="delete"
            size={20}
            color="gray"
            onPress={() => deleteComment(comment.timeStamp)}
          />
          <MaterialIcons
            name="mode-edit"
            size={20}
            color="gray"
            onPress={() => updateComment(comment.timeStamp, comment.comment)}
          />
        </View>
      ) : null}
    </View>
  );
};

export default memo(CommentCard);
