import { StyleSheet, Text, View } from "react-native";
import Hero from "../components/ProductItem/Hero";
import Header from "../components/ProductItem/Header";
import Description from "../components/ProductItem/Description";
import BottomTab from "../components/ProductItem/BottomTab";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";

function ProductItemScreen({ route }) {
  const [item, setItem] = useState(1);
  return (
    <View style={styles.root}>
      <Hero route={route} />
      <View style={styles.rootContainer}>
        <Header route={route} setItem={setItem} item={item} />
        <Description />
        <BottomTab item={item} />
      </View>
    </View>
  );
}

export default ProductItemScreen;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 16,
  },
  rootContainer: {
    flex: 1,
    paddingHorizontal: 20,
    position: "relative",
  },
});
