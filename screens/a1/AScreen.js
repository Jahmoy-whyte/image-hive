import * as React from "react";
import {
  View,
  Button,
  StyleSheet,
  ScrollView,
  Touchable,
  Text,
  TouchableOpacity,
} from "react-native";

import Animated from "react-native-reanimated";
import SafeContainer from "../../components/SafeContainer";
import test from "../../assets/images/testimage.png";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <SafeContainer>
      <ScrollView>
        {[1, 2, 3, 4, 5].map(() => (
          <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("b")}
          >
            <Animated.Image
              source={test}
              style={{ width: 300, height: 300, backgroundColor: "red" }}
              sharedTransitionTag="mytag"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeContainer>
  );
}

const Tab = createBottomTabNavigator();

export function AScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,

    alignItems: "center",
  },
});
