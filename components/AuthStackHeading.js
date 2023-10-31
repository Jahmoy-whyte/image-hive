import { useNavigation } from "@react-navigation/native";
import backgroundIcon from "../assets/images/backgroundIcon.png";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const AuthStackHeading = ({
  childern,
  heading = "",
  subHeading,
  showBackButton = true,
  backButtonIsDisabled = false,
}) => {
  const nav = useNavigation();
  return (
    <View className="bg-primary min-h-[208px] relative overflow-hidden justify-center p-3 ">
      <Image
        className="absolute h-52 w-screen"
        source={backgroundIcon}
        resizeMode="cover"
      />

      {showBackButton ? (
        <TouchableOpacity
          disabled={backButtonIsDisabled}
          onPress={() => nav.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ) : null}

      <Text className="font-bold text-2xl text-white mt-5">{heading}</Text>
      {subHeading ? (
        <Text className="text-sm font-interRegular text-white">
          {subHeading}
        </Text>
      ) : null}

      {childern}
    </View>
  );
};

export default AuthStackHeading;
