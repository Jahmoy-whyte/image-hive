import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import SafeContainer from "../../components/SafeContainer";
import { AntDesign } from "@expo/vector-icons";

import backgroundIcon from "../../assets/images/backgroundIcon.png";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import TextBox from "../../components/TextBox";
import Button from "../../components/Button";
import Checkbox from "expo-checkbox";
import AuthStackHeading from "../../components/AuthStackHeading";
import useSelectCategories from "./useSelectCategories";
import LoadingIndicator from "../../components/LoadingIndicator";
const SelectCategories = ({ navigation }) => {
  const {
    selected,
    setSelected,
    categories,
    isLoading,
    createProfile,
    select,
    buttonIsLoading,
  } = useSelectCategories();
  return (
    <>
      <ExpoStatusBar style="light" />
      <View className="absolute flex-1 bg-primary w-screen h-screen"></View>
      <SafeContainer>
        <ScrollView className="flex-1">
          <AuthStackHeading
            heading="What interest you?"
            subHeading="Select at least 3 categories"
          >
            <View className="rounded-3xl bg-white flex-row min-h-[46px] items-center px-3 my-3">
              <AntDesign name="search1" size={20} color="black" />
              <TextInput
                className="ml-3 flex-1"
                placeholder="Search for categories"
              />
            </View>
          </AuthStackHeading>

          <View style={{ gap: 3, padding: 12 }}>
            {isLoading ? (
              <LoadingIndicator />
            ) : (
              categories.map((category) => (
                <TouchableOpacity
                  onPress={() => select(category.category)}
                  key={category.id}
                  className="flex-1 flex-row px-3 items-center my-1 rounded-3xl border-[1px] border-gray-300 min-h-[46]"
                >
                  <Checkbox
                    style={{ marginRight: 12 }}
                    value={selected.includes(category.category)}
                    color={"#DD133C"}
                  />
                  <Text className="flex-1 font-interRegular text-sm">
                    {category.category}
                  </Text>
                </TouchableOpacity>
              ))
            )}

            <Button
              text="Done"
              buttonStyle={"mt-3"}
              isLoading={buttonIsLoading}
              onPress={createProfile}
            />
          </View>
        </ScrollView>
      </SafeContainer>
    </>
  );
};

export default SelectCategories;
