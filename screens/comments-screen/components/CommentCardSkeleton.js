import { View } from "react-native";

const CommentCardSkeleton = () => {
  return (
    <View className="flex-row  border-b-[1px] border-b-slate-200 py-3">
      <View className="bg-slate-200 w-8 h-8 rounded-[40px]"></View>
      <View className="flex-1 ml-3">
        <View className="h-4 bg-slate-200 w-1/2"></View>
        <View className="h-20 bg-slate-200 mt-3"></View>
      </View>
    </View>
  );
};

export default CommentCardSkeleton;
