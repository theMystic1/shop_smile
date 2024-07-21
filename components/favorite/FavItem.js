import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Icons from "../ui/Icons";
import { useCart } from "../../contexts/CartContext";
import { formatCurrency } from "../../services/helpers";
import { colors } from "../../services/colors";

function FavItem({ product }) {
  const { removeFromFav, isFav } = useCart();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://api.timbu.cloud/images/${product.photos[0].url}`,
        }}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.category}>{product.categories[0].name}</Text>
        <Text style={styles.price}>
          {formatCurrency(product.current_price[0].GBP[0])}
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <Pressable onPress={() => addToFav(product)} style={styles.press}>
          <Icons
            name={isFav(product) ? "heart" : "heart-outline"}
            size={18}
            color={isFav(product) ? colors.tertiary : colors.secondary}
          />
        </Pressable>
        <Pressable onPress={() => removeFromFav(product.unique_id)}>
          <AntDesign name="delete" size={18} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.light_pink,
    borderRadius: 8,
    backgroundColor: "#fff",
    height: 94,
    paddingHorizontal: 10,
  },
  image: {
    width: 60,
    height: 94,
    borderRadius: 8,
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    textTransform: "capitalize",
  },
  category: {
    fontSize: 14,
    color: colors.text,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.tertiary,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  press: {
    marginRight: 8,
  },
});

export default FavItem;
