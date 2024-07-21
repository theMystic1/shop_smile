import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../services/colors";
import Button from "../ui/Button";
import Icons from "../ui/Icons";
import { useRoute } from "@react-navigation/native";
import { formatCurrency } from "../../services/helpers";
import { useCart } from "../../contexts/CartContext";

function BottomTab({ item }) {
  const route = useRoute();

  const { product } = route.params;
  const icon = (
    <Icons name="lock-closed-outline" size={24} color={colors.primary} />
  );
  const { addToCart, isInCart, incDecQuantity } = useCart();

  function handleAddToCart() {
    const productItem = { ...product, quantity: item };
    addToCart(productItem);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.tab}>Total Price</Text>
        <Text style={styles.price}>
          {formatCurrency(product.current_price[0].GBP[0])}
        </Text>
      </View>

      <View style={styles.btnCtn}>
        <Button
          icon={icon}
          style={{
            borderRadius: 20,
            backgroundColor: isInCart(product) ? colors.pink : colors.tertiary,
          }}
          onPress={() => {
            isInCart(product)
              ? incDecQuantity(product.unique_id, "inc")
              : handleAddToCart();
          }}
        >
          {!isInCart ? "Add to cart" : " Added to cart"}
        </Button>
      </View>
    </View>
  );
}

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  tab: {
    fontSize: 14,
    color: colors.grey,
    marginBottom: 3,
  },

  price: {
    fontWeight: "700",
    fontSize: 20,
    color: colors.secondary,
  },

  btnCtn: {
    width: "50%",
  },
});
