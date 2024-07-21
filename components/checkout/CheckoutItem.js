import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../services/colors";
import { formatCurrency } from "../../services/helpers";
import { AntDesign } from "@expo/vector-icons";
import Icons from "../ui/Icons";
import { useCart } from "../../contexts/CartContext";

function CheckoutItem({ product }) {
  const { incDecQuantity, removeFromCart } = useCart();

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
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.innerCont}>
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
        </View>
        <Pressable style={styles.Pressable}>
          <View></View>
        </Pressable>
      </View>
      <View style={styles.quantityContainer}>
        <Pressable
          style={styles.actionContainer}
          onPress={() => removeFromCart(product.unique_id)}
        >
          <AntDesign name="delete" size={18} color="black" />
          <Text>Remove</Text>
        </Pressable>
        <View style={styles.iconBtn}>
          <Pressable
            style={styles.iconButton}
            onPress={() => handleIncDec("dec")}
          >
            <AntDesign name="minus" size={16} color="black" />
          </Pressable>
          <Text style={styles.quantityText}>{product.quantity}</Text>
          <Pressable
            style={styles.iconButton}
            onPress={() => handleIncDec("inc")}
          >
            <Icons name="add" size={16} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default CheckoutItem;

const styles = StyleSheet.create({
  rootContainer: {
    borderColor: colors.light_pink,
    borderWidth: 1,
    paddingRight: 42,
    marginBottom: 10,
    flex: 1,
    width: "100%",
    borderRadius: 8,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    // padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    // height: 94,
  },

  innerCont: {
    flexDirection: "row",
    gap: 6,
  },
  image: {
    width: 60,
    height: 94,
    borderRadius: 8,
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
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
    justifyContent: "space-between",
  },
  iconButton: {
    padding: 4,
    width: 40,
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "",
    alignItems: "center",
    padding: 8,
    gap: 4,
  },
  Pressable: {
    height: 24,
    width: 24,
    borderColor: colors.tertiary,
    borderWidth: 2,
    borderRadius: 12,
  },
  iconBtn: {
    flexDirection: "row",
    height: 30,
    width: 60,
    borderRadius: 19,
    backgroundColor: colors.light_gray,
    alignItems: "center",
  },
});
