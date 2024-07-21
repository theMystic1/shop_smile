import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../services/colors";

function Footer() {
  return (
    <View style={styles.root}>
      <Image source={require("../../assets/discount.png")} />
      <Text style={styles.text}>Use discount/Loyalties [Optional]</Text>
    </View>
  );
}

export default Footer;

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    gap: 16,
  },
  text: {
    color: colors.checkout,
    fontSize: 16,
  },
});
