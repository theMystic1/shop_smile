import { StyleSheet, Text, View } from "react-native";

function PageTitle({ children, style }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>{children}</Text>
    </View>
  );
}

export default PageTitle;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});
