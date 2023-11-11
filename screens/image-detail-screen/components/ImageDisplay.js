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
import Animated from "react-native-reanimated";
const ImageDisplay = ({ images = [] }) => {
  return images.map((image, index) => (
    <Image source={{ uri: image }} key={index} className="w-full h-96" />
  ));
};

export default ImageDisplay;
