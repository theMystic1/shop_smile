import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icons from "../ui/Icons";
import { colors } from "../../services/colors";
import StarRating from "../ui/StarRating";
import { formatCurrency } from "../../services/helpers";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../../contexts/CartContext";

function Item({ product }) {
  const { navigate } = useNavigation();
  const { isInCart, isFav, removeFromFav, addToFav } = useCart();

  // function handleAddFav(id) {
  //   if (isFav(id)) removeFromFav(id);
  //   else addToFav(product);
  // }

  function handleNavigate() {
    navigate("Product", { product });
  }

  return (
    <Pressable onPress={handleNavigate} style={styles.container}>
      <View style={styles.imgCont}>
        <Image
          source={{
            uri: `https://api.timbu.cloud/images/${product.photos[0].url}`,
          }}
          style={styles.image}
        ></Image>
        <View style={styles.icon}>
          <Icons name="" size={24} color={colors.secondary} />
        </View>
      </View>
      <View style={styles.detailsCont}>
        <Text style={styles.title}>{product.name}</Text>
        <View style={styles.ratingCont}>
          <StarRating
            maxRating={5}
            color="#fcc419"
            size={12}
            defaultRating={5}
          />
          <Text style={styles.ratingTxt}> (4.8 ratings)</Text>
        </View>
        <View style={styles.view}>
          <Text style={styles.price}>
            {formatCurrency(product.current_price[0].GBP[0])}
          </Text>
          <Icons
            name={isInCart(product) ? "cart" : "cart-outline"}
            size={18}
            color={colors.tertiary}
          />
        </View>
      </View>
    </Pressable>
  );
}

export default Item;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.light_gray,
    borderRadius: 6,
    marginBottom: 16,
    width: 181,
    height: 181,
    position: "relative",
    zIndex: 50,
  },

  imgCont: {
    // height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    position: "absolute",
    right: 4,
    top: 4,
  },

  image: {
    width: 80,
    height: 90,
    resizeMode: "cover",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  detailsCont: {
    padding: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 4,
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    paddingTop: 12,
    color: colors.tertiary,
  },
  price: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.tertiary,
  },
  ratingCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingTxt: {
    fontSize: 10,
    color: colors.text,
  },
});
