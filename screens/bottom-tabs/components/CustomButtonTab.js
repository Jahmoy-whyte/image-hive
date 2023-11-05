import { View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import accountImage from "../account.png";
import homeImage from "../home.png";
const CustomButtonTab = ({ state, navigation }) => {
  const isFocused = state.index;
  //   console.log(state.index);
  //   console.log("Wdwddddddddddddddd");
  const tabIcons = [homeImage, accountImage, accountImage];
  return (
    <View className="flex-row justify-around min-h-[48px] bg-white py-2">
      {state.routes.map(({ name, key }, index) => {
        if (name == "Add") {
          return (
            <TouchableOpacity
              className="justify-center items-center"
              key={key}
              onPress={() => {
                navigation.navigate("signup");
              }}
            >
              <AntDesign name="pluscircle" size={45} color="#DD133C" />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            className="justify-center items-center"
            key={key}
            onPress={() => {
              navigation.navigate(name);
            }}
          >
            <Image
              source={tabIcons[index]}
              resizeMode="contain"
              className="w-5 h-5"
            />
            <Text
              className={`text-black text-xs mt-1 ${
                isFocused == index ? "text-red-500" : ""
              }`}
            >
              {name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomButtonTab;
