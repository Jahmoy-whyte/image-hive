import Toast from "react-native-toast-message";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
export const showToast = () => {
  const show = (type = "customError", text1, text2) =>
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  return {
    error: (text1, text2) => show("customError", text1, text2),
    success: (text1, text2) => show("customSuccess", text1, text2),
    info: (text1, text2) => show("customInfo", text1, text2),
  };
};

const BasedToast = ({ children, text1, text2, style }) => {
  return (
    <View className="w-screen min-h-[64px]">
      <View
        className={`flex-1 bg-red-300 mx-3 rounded-lg p-3 flex-row items-center ${style}`}
      >
        {children}
        <View className="flex-1 mx-3">
          {text1 != "" ? <Text className="font-interBold">{text1}</Text> : null}
          {text2 != "" ? (
            <Text className="font-interRegular">{text2}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export const toastConfig = {
  customError: ({ text1, text2 }) => (
    <BasedToast text1={text1} text2={text2}>
      <AntDesign name="closecircleo" size={24} color="black" />
    </BasedToast>
  ),
  customSuccess: ({ text1, text2 }) => (
    <BasedToast text1={text1} text2={text2} style={"bg-green-300"}>
      <AntDesign name="checkcircleo" size={24} color="black" />
    </BasedToast>
  ),
  customInfo: ({ text1, text2 }) => (
    <BasedToast text1={text1} text2={text2} style="bg-blue-300">
      <AntDesign name="infocirlceo" size={24} color="black" />
    </BasedToast>
  ),
};
