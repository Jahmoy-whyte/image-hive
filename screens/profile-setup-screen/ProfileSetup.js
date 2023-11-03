import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import SafeContainer from "../../components/SafeContainer";
import { AntDesign, Entypo } from "@expo/vector-icons";
import backgroundIcon from "../../assets/images/backgroundIcon.png";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import TextBox from "../../components/TextBox";
import Button from "../../components/Button";
import Checkbox from "expo-checkbox";
import AuthStackHeading from "../../components/AuthStackHeading";

import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { showToast } from "../../utils/toastLib";
import * as Linking from "expo-linking";
import { validatePassword } from "firebase/auth";
import inputValidater from "../../utils/inputValidater";

const ProfileSetup = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [username, setUsername] = useState("");
  const options = {
    allowsEditing: true,
    quality: 1,
    //aspect: [4, 3],
    //allowsMultipleSelection: true,
    //selectionLimit: 4,
  };
  const pickImage = async (camera = true) => {
    try {
      let result = "";
      if (camera) {
        const { canAskAgain, granted } =
          await ImagePicker.requestCameraPermissionsAsync();

        if (!canAskAgain && granted) return setShowMessage(true);

        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          ...options,
        });
      } else {
        const { canAskAgain, granted } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!canAskAgain && granted) return setShowMessage(true);

        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          ...options,
        });
      }

      if (!result.canceled) {
        setShowModel(false);
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      showToast().error(error.message);
    }
  };

  const nextScreen = () => {
    const { string } = inputValidater();

    const res = string()
      .isNotBlank("Please enter username")
      .minLength(5, "username must be 5 or more letters")
      .maxLength(100, "username is too long")
      .validate(username.trim());

    if (!res.isValid) return showToast().error("", res.error);

    navigation.navigate("select-categories", {
      username: username.trim(),
      image: image,
    });
  };

  const ModelOptions = ({ text, onPress, children }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center  border-gray-300 p-3"
      >
        <View className="p-3 border-[1px] border-gray-300 rounded-md">
          {children}
        </View>
        <Text className="font-interBold text-sm ml-3 flex-1">{text}</Text>
        <AntDesign name="arrowright" size={24} color="black" />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ExpoStatusBar style="light" />
      <View className="absolute flex-1 bg-primary w-screen h-screen"></View>
      <SafeContainer>
        <ScrollView className="flex-1">
          <AuthStackHeading heading="Profile Setup" showBackButton={false} />

          {showMessage ? (
            <View className="border-[1px] m-3 p-3 rounded-lg border-gray-300 bg-red-100">
              <Text className="font-interBold text-xs">Instruction</Text>
              <Text className="font-interRegular text-xs">
                Open settings and enable storage and camera permission and try
                again
              </Text>
              <Text
                onPress={() => Linking.openSettings()}
                className="font-interRegular text-xs text-blue-500 mt-1"
              >
                OpenSettings
              </Text>
            </View>
          ) : null}

          <View className="px-3 py-5 " style={{ gap: 16 }}>
            <View className=" flex-row items-center">
              <TouchableOpacity
                onPress={() => setShowModel(true)}
                className="border-[1px] border-gray-300  rounded-[60px] w-20 h-20 justify-center items-center"
              >
                {image ? (
                  <Image
                    source={{ uri: image }}
                    className="w-20 h-20 rounded-[60px]"
                  />
                ) : (
                  <AntDesign name="user" size={30} color="gray" />
                )}

                <View className="absolute bottom-[-14px] right-0 bg-primary  rounded-[60px] w-7 h-7 justify-center items-center">
                  <Entypo name="edit" size={12} color="white" />
                </View>
              </TouchableOpacity>

              <View className="flex-1 ml-3">
                <Text className="font-interRegular text-sm">
                  Please enter a username and image
                </Text>
                <Text className="font-interBold text-sm">
                  Note:
                  <Text className="font-interRegular text-sm">
                    {" "}
                    image is optional
                  </Text>
                </Text>

                {image ? (
                  <Text
                    onPress={() => setImage(null)}
                    className="font-interRegular text-sm text-blue-500"
                  >
                    Clear
                  </Text>
                ) : null}
              </View>
            </View>
            <TextBox
              label="Username"
              placeHolder="Please enter a username"
              onChangeText={(value) => setUsername(value)}
              value={username}
            />

            <Button text="Next" onPress={nextScreen} />
          </View>
        </ScrollView>
      </SafeContainer>

      <Modal
        transparent={true}
        visible={showModel}
        animationType="fade"
        onRequestClose={() => setShowModel(false)}
      >
        <Pressable
          onPress={() => setShowModel(false)}
          className="bg-black opacity-20 absolute w-screen h-full"
        ></Pressable>
        <View className="flex-1 justify-center ">
          <View className=" justify-center m-3 p-3 bg-white border-[1px]  rounded-md  border-gray-300">
            <ModelOptions onPress={pickImage} text={"Camera"}>
              <AntDesign name="camerao" size={24} color="black" />
            </ModelOptions>

            <ModelOptions onPress={() => pickImage(false)} text={"Gallery"}>
              <AntDesign name="picture" size={24} color="black" />
            </ModelOptions>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProfileSetup;
