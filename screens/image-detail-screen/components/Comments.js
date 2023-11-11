import {
  ScrollView,
  View,
  Image,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import testimage from "../../../assets/images/testimage.png";
import TextBox from "../../../components/TextBox";
const Comments = ({ comments = [] }) => {
  return (
    <View className="p-3">
      <Text className="font-interBold text-lg">Comments</Text>

      {comments.length < 1 ? (
        <View className="justify-center items-center bg-slate-100 my-3 rounded-md h-20">
          <Text className="text-xs text-center font-interRegular ">
            No Comments
          </Text>
        </View>
      ) : (
        <>
          {comments.map((comment) => (
            <View
              key={comment.id}
              className="flex-row  border-b-[1px] border-b-gray-300 py-3"
            >
              <Image source={testimage} className="w-8 h-8 rounded-[40px]" />
              <View className="flex-1 ml-3">
                <Text className="text-xs font-bold">{"text.name"}</Text>
                <Text className="text-xs font-interRegular">
                  {comment.comment}
                </Text>
              </View>
            </View>
          ))}
          <Text className="font-interBold text-xs text-primary my-3">
            View All comments
          </Text>
        </>
      )}

      <Pressable className="justify-center  border-gray-300 border-[1px] px-3 min-h-[46px] rounded-3xl">
        <Text className="text-xs font-interRegular text-gray-400">
          Leave A comment
        </Text>
      </Pressable>
    </View>
  );
};

export default Comments;
