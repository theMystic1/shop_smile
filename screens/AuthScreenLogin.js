import { StyleSheet, View } from "react-native";
import Login from "../components/Auth/Login";
import { colors } from "../services/colors";
// import Login from "../components/Auth/Login";

function AuthScreenLogin() {
  return (
    <View style={styles.rootContainer}>
      <Login />
    </View>
  );
}

export default AuthScreenLogin;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
