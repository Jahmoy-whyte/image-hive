import { SafeAreaView, View, Text, Image } from "react-native";
import SafeContainer from "../../components/SafeContainer";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import backgroundIcon from "../../assets/images/backgroundIcon.png";
import Button from "../../components/Button";
const LandingScreen = ({ navigation }) => {
  return (
    <>
      <ExpoStatusBar style="light" />
      <View className="absolute flex-1 bg-primary w-screen h-screen"></View>
      <SafeContainer>
        <View className="flex-1 flex-col bg-primary relative">
          <Image
            source={backgroundIcon}
            resizeMode="cover"
            className="absolute w-screen"
          />

          <View className="mt-auto mx-3">
            <Text className=" text-white text-2xl font-interBold mb-2">
              What is {"\n"}Image Hive?
            </Text>
            <Text className="font-interRegular text-white text-sm mb-2">
              Is platform for individuals to showcase their talents and work on
              a diverse range of visual projects.
            </Text>
          </View>
          <View className="bg-blackOpacity min-h-[200] px-3 py-3 justify-center ">
            <Button
              text="Sign Up"
              onPress={() => navigation.navigate("signup")}
            />
            <Button
              onPress={() => navigation.navigate("login")}
              text="Login"
              buttonStyle={" bg-transparent border-[1px] border-white my-3 "}
            />
            <Text className="text-white font-interRegular text-sm">
              Or Login As{" "}
              <Text className="font-interBold text-primary">Guest</Text>
            </Text>
          </View>
        </View>
      </SafeContainer>
    </>
  );
};

export default LandingScreen;
