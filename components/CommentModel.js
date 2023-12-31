import {
  View,
  Modal,
  TextInput,
  Pressable,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
const CommentModel = ({
  onChangeHandler,
  visible = false,
  setVisible,
  submitComment,
  modelTextBoxValue = "",
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <Pressable
        className="flex-1 bg-blackOpacity justify-end"
        onPress={() => setVisible(false)}
      >
        <View className="flex-row bg-white p-3 items-center ">
          <View className="h-10  w-10 rounded-[40px] bg-slate-300 mr-3"></View>
          <TextInput
            className="flex-1"
            placeholder="Leave A comment"
            onChangeText={(value) => onChangeHandler(value)}
            value={modelTextBoxValue}
          />
          <TouchableOpacity
            onPress={submitComment}
            className="h-10  w-10 rounded-[10px] justify-center items-center bg-primary"
          >
            <AntDesign name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default CommentModel;
