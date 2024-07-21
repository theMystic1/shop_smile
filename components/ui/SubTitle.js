import { StyleSheet, Text } from "react-native";
import { colors } from "../../services/colors";

function SubTitle({ children }) {
  return <Text style={style.text}>{children}</Text>;
}

export default SubTitle;
const style = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.secondary,
    marginVertical: 16,
  },
});
