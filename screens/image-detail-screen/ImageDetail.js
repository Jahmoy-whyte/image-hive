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

import testimage from "../../assets/images/testimage.png";
import Heading from "./components/Heading";
import ImageDisplay from "./components/ImageDisplay";
import ActionBar from "./components/ActionBar";
import Comments from "./components/Comments";
import Animated from "react-native-reanimated";
const ImageDetail = ({ navigation }) => {
  console.log();
  return (
    <>
      <Heading navigation={navigation} />
      <ScrollView>
        <View className="flex-1">
          <ImageDisplay images={[testimage, testimage]} />
          <ActionBar />
          <Comments />
        </View>
      </ScrollView>
    </>
  );
};

export default ImageDetail;
