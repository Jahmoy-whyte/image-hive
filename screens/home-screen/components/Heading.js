import { View, Text, ScrollView, Image } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import CategoryBubble from "./CategoryBubble";
const Heading = ({ user }) => {
  return (
    <View className="p-3">
      <View className="flex-row justify-between ">
        <View className="flex-1">
          <Text className="font-interBold text-3xl">Welcome</Text>
          <Text className="font-interBold text-3xl">
            Back {user.username.split(" ")[0]}!
          </Text>
        </View>

        <Image
          className="w-10 h-10 rounded-[40px]"
          source={
            user.profileImage ? { uri: user.profileImage } : profilePlaceHolder
          }
        />
      </View>

      <View className="flex-row my-3  border-gray-300 border-[1px] px-3 min-h-[46px] rounded-3xl items-center">
        <AntDesign name="search1" size={20} color="black" />
        <Text className="ml-2 text-xs">Search For Your Car Parts</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <CategoryBubble
          text={"Explore"}
          categoryStyle={"bg-primary border-none"}
          textStyle={"ml-2 text-white"}
        >
          <FontAwesome name="wpexplorer" size={20} color="white" />
        </CategoryBubble>

        {user.categories.map((text, index) => (
          <CategoryBubble text={text} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Heading;
