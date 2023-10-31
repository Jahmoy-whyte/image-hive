import { SafeAreaView, View, Text, ScrollView, Image } from "react-native";
import SafeContainer from "../../components/SafeContainer";
import { AntDesign } from "@expo/vector-icons";
import backgroundIcon from "../../assets/images/backgroundIcon.png";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import TextBox from "../../components/TextBox";
import Button from "../../components/Button";
import Checkbox from "expo-checkbox";
const Home = () => {
  return (
    <>
      <SafeContainer>
        <ScrollView className="flex-1">
          <Text>Home</Text>
        </ScrollView>
      </SafeContainer>
    </>
  );
};

export default Home;
