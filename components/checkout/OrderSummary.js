import { StyleSheet, Text, View } from "react-native";
import SubTitle from "../ui/SubTitle";
import { colors } from "../../services/colors";
import { formatCurrency } from "../../services/helpers";
import Button from "../ui/Button";
import { useCart } from "../../contexts/CartContext";

function OrderSummary() {
  const { totalPrice, cart } = useCart();

  const total = totalPrice + 15;

  return (
    <View>
      <SubTitle>Order Summary</SubTitle>
      <View style={styles.container}>
        <FlexItem>
          <Item>Subtotal:</Item>
          <Item>{formatCurrency(totalPrice)}</Item>
        </FlexItem>
        <FlexItem>
          <Item>Tax</Item>
          <Item>{formatCurrency(5)}</Item>
        </FlexItem>
        <FlexItem>
          <Item>Shipping</Item>
          <Item>{formatCurrency(10)}</Item>
        </FlexItem>
      </View>
      <FlexItem>
        <Item style={{ fontWeight: "bold", fontSize: 18 }}>Total:</Item>
        <Item
          style={{ fontWeight: "bold", fontSize: 18, color: colors.tertiary }}
        >
          {formatCurrency(total)}
        </Item>
      </FlexItem>
      <Button style={styles.btn}>Pay Now</Button>
    </View>
  );
}

function FlexItem({ children }) {
  return <View style={styles.flexContainer}>{children}</View>;
}

function Item({ children, style }) {
  return <Text style={[styles.item, style]}>{children}</Text>;
}

export default OrderSummary;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.checkout,
    flex: 1,
    paddingVertical: 16,
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },

  item: {
    color: colors.checkout,
    fontSize: 16,
    fontWeight: "600",
  },
  btn: {
    height: 60,
  },
});
