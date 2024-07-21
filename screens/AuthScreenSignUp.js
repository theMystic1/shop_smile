import { StyleSheet, View } from "react-native";
import Signup from "../components/Auth/Signup";
import { colors } from "../services/colors";
// import Signup from "../components/Auth/Signup";

function AuthScreenSignUp() {
  return (
    <View style={styles.rootContainer}>
      <Signup />
    </View>
  );
}

export default AuthScreenSignUp;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
