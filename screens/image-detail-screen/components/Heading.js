import {
  ScrollView,
  View,
  Image,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
const Heading = ({ images = [], navigation }) => {
  return (
    <SafeAreaView
      style={
        Platform.OS == "android" ? { marginTop: StatusBar.currentHeight } : null
      }
      className="flex-row items-center justify-between absolute z-10 w-full p-3"
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="bg-blackOpacity w-10 h-10 justify-center items-center rounded-[40px]"
      >
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity className="bg-blackOpacity w-10 h-10 justify-center items-center rounded-[40px]">
        <Feather name="bookmark" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Heading;
