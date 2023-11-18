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
import ErrorView from "../../components/ErrorView";
import CommentModel from "../../components/CommentModel";
const ImageDetail = ({ navigation }) => {
  const { imageData, state, dispatch, retry, commentHook } = useImageDetail();

  if (state.isError || commentHook.state.error) {
    return <ErrorView message={state.isError} onPress={retry} />;
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

          {commentHook.state.isLoading ? (
            <CommentsSkeleton />
          ) : (
            <Comments
              setCommentModelVisiblity={commentHook.setModelVisible}
              comments={commentHook.state.comments}
              onPressViewAll={() =>
                navigation.navigate("comments", {
                  imageId: imageData.id,
                })
              }
            />
          )}
          <CommentModel
            visible={commentHook.state.modelVisible}
            onChangeHandler={commentHook.setModelTextBox}
            setVisible={commentHook.setModelVisible}
            submitComment={commentHook.addComment}
            modelTextBoxValue={commentHook.state.modelTextBox}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ImageDetail;
