import { TouchableOpacity, View } from "react-native";

const ImageCardsSkeleton = () => {
  return (
    <TouchableOpacity className="h-64 overflow-hidden rounded-lg mx-3 mb-3">
      <View className="h-64 w-full bg-slate-50"></View>
      <View className="flex-row  items-center p-3 absolute z-10 w-full bottom-0 overflow-hidden bg-slate-100">
        <View className="w-10 h-10 rounded-[40px] bg-slate-200"></View>
        <View className="ml-3 flex-1">
          <View className="max-h-4 bg-slate-200 flex-1 mb-1 w-1/2"></View>
          <View className="max-h-4 bg-slate-200 flex-1"></View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ImageCardsSkeleton;
