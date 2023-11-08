import * as React from "react";
import { View, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Animated from "react-native-reanimated";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
        style={{ marginTop: 10 }}
      />
      <Animated.View
        style={{ width: 300, height: 300, backgroundColor: "red" }}
        sharedTransitionTag="mytag"
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
        style={{ marginTop: 10 }}
      />
      <Animated.Image
        source={{ uri: "https://picsum.photos/id/39/200" }}
        style={{ width: 100, height: 100 }}
        sharedTransitionTag="mytag"
      />
    </View>
  );
}

export default function NavTest() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
