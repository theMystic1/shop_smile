import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import StarRating from "../ui/StarRating";
import { colors } from "../../services/colors";
import Icons from "../ui/Icons";
import { AntDesign } from "@expo/vector-icons";
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";
function Header({ route, setItem, item }) {
  const { product } = route.params;

  // const [item, setItem] = useState(1);
  const { cart, isInCart } = useCart();

  // console.log(product.available_quantity);

  function incDecItem(type) {
    if (type === "inc") {
      if (item < product?.available_quantity) {
        setItem((prevItem) => prevItem + 1);
      } else {
        Alert.alert(
          "Availability exceeded",
          `We only have ${product?.available_quantity} ${product.name} in stock`
        );
      }
    } else if (type === "dec") {
      if (item > 1) {
        setItem((prevItem) => prevItem - 1);
      } else {
        Alert.alert(
          "Minimum quantity",
          "You can not have less than one product"
        );
      }
    }
  }

  const cartItem = cart.find((crt) => crt.unique_id === product.unique_id);

  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.categ}>{product.categories[0].name}</Text>
        <View style={styles.ratingCont}>
          <StarRating
            maxRating={5}
            color="#fcc419"
            size={12}
            defaultRating={5}
          />
          <Text style={styles.ratingTxt}> (320 reviews)</Text>
        </View>
      </View>
      <View style={styles.right}>
        <View style={styles.btn}>
          <Pressable onPress={() => incDecItem("dec")}>
            <AntDesign name="minus" size={18} color="black" />
          </Pressable>
          <Text>{isInCart(product) ? cartItem?.quantity : item}</Text>
          <Pressable onPress={() => incDecItem("inc")}>
            <Icons name="add" size={18} />
          </Pressable>
        </View>
        <Text style={styles.repot}>Available in stock</Text>
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 48,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  categ: {
    fontSize: 12,
    color: colors.text,
    marginBottom: 8,
  },
  ratingCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingTxt: {
    fontSize: 12,
    color: colors.text,
  },

  btn: {
    height: 40,
    width: 80,
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: colors.grey,
  },
  repot: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: "700",
    marginTop: 8,
  },
  right: {
    alignItems: "flex-end",
  },
});
