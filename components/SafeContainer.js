import { SafeAreaView, StatusBar, Platform, StyleSheet } from "react-native";

const SafeContainer = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {},
      android: { marginTop: StatusBar.currentHeight },
    }),
    flex: 1,
    backgroundColor: "white",
  },
});

export default SafeContainer;
