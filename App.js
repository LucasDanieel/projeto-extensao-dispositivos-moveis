import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Routes from "./src/routes/Stack";

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
      <StatusBar style="auto" backgroundColor="#fff" barStyle="dark-content" />
    </NavigationContainer>
  );
}
