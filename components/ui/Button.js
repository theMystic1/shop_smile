import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../../services/colors";

function Button({ children, icon, style, onPress }) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      {icon}
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.tertiary,
    borderRadius: 10,
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
