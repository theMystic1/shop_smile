import { ScrollView, StyleSheet, Text, View } from "react-native";
import { styles } from "./HomeScreen";
import Header from "../components/ui/Header";
import PageTitle from "../components/ui/PageTitle";
import { useEffect, useState } from "react";
import { allProducts } from "../services/http";
import CheckoutItem from "../components/checkout/CheckoutItem";
import Indicator from "../components/ui/Indicator";
import { colors } from "../services/colors";
import SubTitle from "../components/ui/SubTitle";
import PayMethod from "../components/checkout/PayMethod";
import AddressForm from "../components/checkout/AddressForm";
import OrderSummary from "../components/checkout/OrderSummary";
import Footer from "../components/checkout/Footer";
import { useCart } from "../contexts/CartContext";
import { useNavigation } from "@react-navigation/native";

function CheckoutScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { cart } = useCart();
  const { navigate } = useNavigation();
  if (isLoading) return <Indicator />;

  useEffect(() => {
    if (cart.length < 1) navigate("Home");
  }, [cart, navigate]);

  return (
    <View style={[styles.rootContainer, style.root]}>
      <Header />
      <ScrollView>
        <PageTitle>Order confirmation</PageTitle>
        <SubTitle>Order Summary</SubTitle>
        {cart.map((product) => (
          <CheckoutItem key={product.unique_id} product={product} />
        ))}

        <PayMethod />
        <AddressForm />
        <OrderSummary />
        <Footer />
      </ScrollView>
    </View>
  );
}

export default CheckoutScreen;
const style = StyleSheet.create({
  root: {
    marginBottom: 40,
  },
});
