import { View, Modal, TextInput, Pressable } from "react-native";

const CommentModel = ({ onChangeHandler, visible = false, setVisible }) => {
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
          />
        </View>
      </Pressable>
    </Modal>
  );
};

export default CommentModel;
