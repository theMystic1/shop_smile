import { ActivityIndicator, StyleSheet, View } from "react-native";

function Indicator() {
  return (
    <View style={styles.indicator}>
      <ActivityIndicator size="small" />
    </View>
  );
}

export default Indicator;

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
