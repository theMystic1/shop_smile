import { Image, Pressable, StyleSheet, View } from "react-native";
import Icons from "./Icons";
import { colors } from "../../services/colors";
import { useNavigation } from "@react-navigation/native";

function Header({ position }) {
  const { navigate } = useNavigation();
  return (
    <View style={styles.rootContainer}>
      <Pressable style={styles.container} onPress={() => navigate("Items")}>
        {/* <Icons name="menu" color={colors.text} size={28} /> */}
        <Image source={require("../../assets/TimbuMed.png")} />
      </Pressable>
      <Pressable style={styles.container} onPress={() => navigate("Cart")}>
        {position == "cart" ? null : (
          <Icons name="cart-outline" color={colors.text} size={28} />
        )}
        {/* <Icons name="notifications-outline" color={colors.text} size={28} /> */}
      </Pressable>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 12,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
