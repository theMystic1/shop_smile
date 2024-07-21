import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../services/colors";

function Message({ message, page, onPress }) {
  return (
    <View>
      <View style={styles.text}>
        <Text style={styles.text}>{message}</Text>
        <Pressable onPress={onPress}>
          <Text style={styles.pressableTxt}>{page}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Message;
const styles = StyleSheet.create({
  text: {
    color: "#979797",
    flexDirection: "row",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginVertical: 20,
  },
  pressableTxt: {
    fontSize: 16,
    color: colors.tertiary,
    textDecorationLine: "underline",
    marginLeft: 8,
  },
  btn: {
    backgroundColor: "#d87d4a",
    marginTop: 16,
  },
});
