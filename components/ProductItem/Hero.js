import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icons from "../ui/Icons";
import { colors } from "../../services/colors";
import { useCart } from "../../contexts/CartContext";

function Hero({ route }) {
  const num = [1, 2, 3];

  const { isFav, removeFromFav, addToFav } = useCart();

  function handleAddFav(prod) {
    isFav(prod) ? removeFromFav(prod.unique_id) : addToFav(prod);
  }

  const product = route.params.product;
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://api.timbu.cloud/images/${product.photos[0].url}`,
        }}
        style={styles.image}
      />
      <View style={styles.bigFlex}>
        <View style={styles.hidden}>
          <Text>hidden</Text>
        </View>
        <View style={styles.smallFlex}>
          {num.map((nm) => (
            <View style={styles.dot} key={nm}></View>
          ))}
        </View>
        <Pressable onPress={() => handleAddFav(product)}>
          <Icons
            name={isFav(product) ? "heart" : "heart-outline"}
            size={24}
            color={isFav(product) ? colors.tertiary : colors.secondary}
          />
        </Pressable>
      </View>
    </View>
  );
}

export default Hero;

const styles = StyleSheet.create({
  container: {
    height: 350,
    width: "100%",
    backgroundColor: colors.light,
    padding: 12,
  },

  image: {
    height: 300,
  },

  bigFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallFlex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 16,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    marginHorizontal: 8,
  },
  hidden: {
    opacity: 0,
  },
});
