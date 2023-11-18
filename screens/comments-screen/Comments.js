import {
  View,
  FlatList,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import SafeContainer from "../../components/SafeContainer";
import CustomHeader from "../../components/CustomHeader";
import CommentCardSkeleton from "./components/CommentCardSkeleton";
import useComments from "./useComments";
import CommentCard from "./components/CommentCard";
import ErrorView from "../../components/ErrorView";
import CommentModel from "../../components/CommentModel";

const Comments = () => {
  const {
    dispatch,
    navigateToProfile,
    retry,
    state,
    commentHook,
    placeHolderCommentsArray,
  } = useComments();

  if (state.error || commentHook.state.error) {
    return (
      <ErrorView
        message={state.error || commentHook.state.error}
        onPress={retry}
      />
    );
  }
  return (
    <>
      <SafeContainer>
        <CustomHeader title="Comments" />

        <FlatList
          ListFooterComponent={
            commentHook.state.isLoadingMore ? (
              <View className="h-14  justify-center items-center">
                <ActivityIndicator color={"black"} />
              </View>
            ) : null
          }
          keyExtractor={(item) => item.timeStamp}
          onEndReached={() => commentHook.loadMoreComments(1)}
          className="px-3"
          data={
            commentHook.state.isLoading
              ? placeHolderCommentsArray
              : commentHook.state.comments
          }
          renderItem={({ item }) => {
            return commentHook.state.isLoading ? (
              <CommentCardSkeleton />
            ) : (
              <CommentCard comment={item} />
            );
          }}
        />
      </SafeContainer>

      <View className="bg-white p-3">
        <Pressable
          onPress={() => commentHook.setModelVisible(true)}
          className="justify-center  border-gray-300 border-[1px] px-3 min-h-[46px] rounded-3xl"
        >
          <Text className="text-xs font-interRegular text-gray-400">
            Leave A comment
          </Text>
        </Pressable>
      </View>

      <CommentModel
        onChangeHandler={commentHook.setModelTextBox}
        setVisible={commentHook.setModelVisible}
        visible={commentHook.state.modelVisible}
        submitComment={commentHook.addComment}
        modelTextBoxValue={commentHook.state.modelTextBox}
      />
    </>
  );
};

export default Comments;
