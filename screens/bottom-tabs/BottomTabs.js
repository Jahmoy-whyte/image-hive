import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../home-screen/Home";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButtonTab from "./components/CustomButtonTab";
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  const nav = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={() => navigation.navigate("test")}>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  const nav = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <Text onPress={() => nav.navigate("test")}>Settings!</Text>
    </View>
  );
}

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarBadge: 4 }}
      tabBar={(props) => <CustomButtonTab {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Add" component={Home} />
      <Tab.Screen name="Account" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
