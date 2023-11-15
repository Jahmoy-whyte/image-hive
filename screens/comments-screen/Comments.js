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

const Comments = () => {
  const { dispatch, navigateToProfile, retry, state, loadMoreComments } =
    useComments();

  if (state.error) {
    return <ErrorView message={state.error} onPress={retry} />;
  }
  return (
    <>
      <SafeContainer>
        <CustomHeader title="Comments" />

        <FlatList
          ListFooterComponent={
            state.isLoadingMoreComments ? (
              <View className="h-14  justify-center items-center">
                <ActivityIndicator color={"black"} />
              </View>
            ) : null
          }
          onEndReached={loadMoreComments}
          className="px-3"
          data={state.isLoading ? [1, 2, 3, 4, 5, 6] : state.comments}
          renderItem={({ item }) => {
            return state.isLoading ? (
              <CommentCardSkeleton />
            ) : (
              <CommentCard comment={item} />
            );
          }}
        />
      </SafeContainer>

      <Pressable className="justify-center  border-gray-300 border-[1px] px-3 min-h-[46px] rounded-3xl">
        <Text className="text-xs font-interRegular text-gray-400">
          Leave A comment
        </Text>
      </Pressable>
    </>
  );
};

export default Comments;
