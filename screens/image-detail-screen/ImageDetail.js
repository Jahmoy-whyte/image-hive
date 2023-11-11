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
import useImageDetail from "./useImageDetail";
import ActionBarSkeleton from "./components/ActionBarSkeleton";
import CommentsSkeleton from "./components/CommentsSkeleton";
const ImageDetail = ({ navigation }) => {
  const { imageData, state, dispatch } = useImageDetail();

  if (state.isError) {
    return (
      <View className="mt-11">
        <Text>{state.isError}</Text>
      </View>
    );
  }

  return (
    <>
      <Heading navigation={navigation} />
      <ScrollView className="bg-white">
        <View className="flex-1">
          <ImageDisplay images={imageData.images} />

          {state.isLoadingProfile ? (
            <ActionBarSkeleton />
          ) : (
            <ActionBar state={{ ...state, ...imageData }} />
          )}

          {state.isLoadingComments ? (
            <CommentsSkeleton />
          ) : (
            <Comments comments={state.comments} />
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default ImageDetail;
