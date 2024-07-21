import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useCart } from "../contexts/CartContext";
import FavItem from "../components/favorite/FavItem";
import PageTitle from "../components/ui/PageTitle";
import { styles as rootStyles } from "./HomeScreen"; // Assuming you have styles exported from HomeScreen

function FavoritesScreen() {
  const { favoriteItems } = useCart();

  if (!favoriteItems.length) {
    return (
      <View style={styles.container}>
        <PageTitle>Your favorite list is empty</PageTitle>
      </View>
    );
  }

  return (
    <ScrollView style={rootStyles.rootContainer}>
      <PageTitle>Favorite Products</PageTitle>
      {favoriteItems.map((product) => (
        <FavItem product={product} key={product.unique_id} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoritesScreen;
