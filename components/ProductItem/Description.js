import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../services/colors";

function Description() {
  const route = useRoute();

  const { product } = route.params;
  return (
    <View>
      <Text style={styles.label}>Description</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

export default Description;

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 48,
  },

  description: {
    marginTop: 18,
    fontSize: 12,
    color: colors.text,
  },
});
