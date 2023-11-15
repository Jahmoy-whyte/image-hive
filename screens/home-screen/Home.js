import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import SafeContainer from "../../components/SafeContainer";
import { AntDesign } from "@expo/vector-icons";
import backgroundIcon from "../../assets/images/backgroundIcon.png";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import TextBox from "../../components/TextBox";
import Button from "../../components/Button";
import Checkbox from "expo-checkbox";
import profilePlaceHolder from "../../assets/images/profilePlaceHolder.png";
import useHome from "./useHome";
import CategoryBubble from "./components/CategoryBubble";
import { FontAwesome } from "@expo/vector-icons";

import testimage from "../../assets/images/testimage.png";
import ImageCards from "./components/ImageCards";
import ImageCardsSkeleton from "./components/ImageCardsSkeleton";
import Heading from "./components/Heading";
import ErrorView from "../../components/ErrorView";

const Home = ({ navigation }) => {
  const { user, state, loadMoreImages, navToDetails, retry } = useHome();
  const loadingSkeletonArray = [{ id: "id1" }, { id: "id2" }, { id: "id3" }];

  if (state.isError) {
    return <ErrorView message={state.isError} onPress={retry} />;
  }
  return (
    <>
      <SafeContainer>
        <FlatList
          ListHeaderComponent={<Heading user={user} />}
          data={state.isLoading ? loadingSkeletonArray : state.imageArray}
          ListFooterComponent={
            state.isloadingMore ? (
              <View className="justify-center items-center ">
                <ActivityIndicator color={"black"} />
              </View>
            ) : null
          }
          onEndReached={loadMoreImages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return state.isLoading ? (
              <ImageCardsSkeleton />
            ) : (
              <ImageCards data={item} onPress={navToDetails} />
            );
          }}
        />
      </SafeContainer>
    </>
  );
};

export default Home;
