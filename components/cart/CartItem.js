import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { formatCurrency } from "../../services/helpers";
import { colors } from "../../services/colors";
import { AntDesign } from "@expo/vector-icons";
import Icons from "../ui/Icons";
import { useCart } from "../../contexts/CartContext";

function CartItem({ product }) {
  const { incDecQuantity, removeFromCart, isFav, removeFromFav } = useCart();

  function handleAddFav(prod) {
    if (isFav(prod)) removeFromFav(prod.unique_id);
    else addToFav(product);
  }

  function handleIncDec(type) {
    if (type === "inc" && product.quantity === product.available_quantity) {
      Alert.alert(
        "Max Quantity",
        `We only have ${product.available_quantity} ${product.name} in stock`
      );
      return;
    } else if (
      type === "inc" &&
      product.quantity < product.available_quantity
    ) {
      incDecQuantity(product.unique_id, type);
    }

    if (product.quantity > 1 && type === "dec") {
      incDecQuantity(product.unique_id, type);
    } else if (product.quantity === 1 && type === "dec")
      removeFromCart(product.unique_id);
  }
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
      <View style={styles.quantityContainer}>
        <Pressable
          style={styles.iconButton}
          onPress={() => handleIncDec("dec")}
        >
          <AntDesign name="minus" size={16} color="black" />
        </Pressable>
        <Text style={styles.quantityText}>{product?.quantity}</Text>
        <Pressable
          style={styles.iconButton}
          onPress={() => handleIncDec("inc")}
        >
          <Icons name="add" size={16} />
        </Pressable>
      </View>
      <View style={styles.actionContainer}>
        <Pressable onPress={() => handleAddFav(product)}>
          <Icons
            name={isFav(product.unique_id) ? "heart" : "heart-outline"}
            size={18}
            color={colors.secondary}
          />
        </Pressable>

        <Pressable onPress={() => removeFromCart(product.unique_id)}>
          <AntDesign name="delete" size={18} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.light_pink,
    borderRadius: 8,
    backgroundColor: "#fff",
    height: 94,
  },
  image: {
    width: 60,
    height: 94,
    borderRadius: 8,
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
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
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    padding: 4,
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  actionContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    gap: 8,
  },
});
