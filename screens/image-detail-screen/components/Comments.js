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
const Comments = ({
  comments = [],
  onPressViewAll,
  setCommentModelVisiblity,
}) => {
  return (
    <View className="p-3">
      {comments.length < 1 ? (
        <View className="justify-center items-center bg-slate-100 h-32 rounded-md">
          <Text className="text-xs text-center font-interRegular ">
            No Comments
          </Text>
        </View>
      ) : (
        <View key={comments[0].id} className="bg-slate-50   p-3  rounded-md ">
          <View className="flex-row justify-between items-center">
            <Text className="font-interBold text-base ">Comments</Text>
            <Text
              className="font-interBold text-xs text-primary my-3"
              onPress={onPressViewAll}
            >
              View All
            </Text>
          </View>

          <View className="flex-row">
            <Image source={testimage} className="w-8 h-8 rounded-[40px]" />
            <View className="flex-1 ml-3">
              <Text className="text-xs font-bold">{"text.name"}</Text>
              <Text className="text-xs font-interRegular">
                {comments[0].comment}
              </Text>
            </View>
          </View>
        </View>
      )}

      <Pressable
        onPress={() => setCommentModelVisiblity(true)}
        className="justify-center  border-gray-300 border-[1px] px-3 min-h-[46px] rounded-3xl my-3"
      >
        <Text className="text-xs font-interRegular text-gray-400">
          Leave A comment
        </Text>
      </Pressable>
    </View>
  );
};

export default Comments;
