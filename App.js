import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./Navigators/StackNav";
import { ContextProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <ContextProvider>
        <NavigationContainer style={styles.container}>
          <StackNav />
          <StatusBar style="auto" />
        </NavigationContainer>
      </ContextProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
});
