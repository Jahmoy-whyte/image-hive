import * as React from "react";
import { View, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Animated from "react-native-reanimated";
import test from "../../assets/images/testimage.png";
export function BScreen({ navigation }) {
  return [1, 2, 3, 4].map(() => (
    <View style={styles.container}>
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
        style={{ marginTop: 10 }}
      />

      <Animated.Image
        source={test}
        style={{ width: 100, height: 100 }}
        sharedTransitionTag="mytag"
      />
    </View>
  ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
