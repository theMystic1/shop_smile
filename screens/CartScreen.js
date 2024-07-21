import { ScrollView, StyleSheet, View, Text } from "react-native";
import Header from "../components/ui/Header";
import { useEffect, useState } from "react";
import { allProducts } from "../services/http";
import Indicator from "../components/ui/Indicator";
import CartItem from "../components/cart/CartItem";
import Button from "../components/ui/Button";
import PageTitle from "../components/ui/PageTitle";
import { colors } from "../services/colors";
import { useCart } from "../contexts/CartContext";

function CartScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const { cart } = useCart();
  if (isLoading) return <Indicator />;
  return (
    <View style={styles.rootContainer}>
      <Header />
      {cart.length ? (
        <>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <PageTitle>Cart Summary</PageTitle>
            {cart.map((product) => (
              <CartItem product={product} key={product.unique_id} />
            ))}
          </ScrollView>
          <View style={styles.btnCont}>
            <Button
              style={styles.button}
              onPress={() => navigation.navigate("Checkout")}
            >
              Checkout
            </Button>
          </View>
        </>
      ) : (
        <Text style={styles.emptyText}>No products available in your cart</Text>
      )}
    </View>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.primary,
  },
  scrollViewContent: {
    paddingBottom: 100, // Add padding to ensure space for the button
  },
  btnCont: {
    position: "absolute",
    bottom: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 8,
    height: 50,
    width: "90%",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#666",
  },
});
