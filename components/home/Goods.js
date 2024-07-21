import { StyleSheet, Text, View } from "react-native";
import Item from "./Item";

function Goods({ products, searchError }) {
  // const [products, setProducts] = useState(null);

  // if (isLoading) return <Indicator />;

  if (!products.length)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: "#fff",
        }}
      >
        <Text>{searchError}</Text>
      </View>
    );
  return (
    <View style={styles.rootcont}>
      {products?.map((product) => (
        <Item product={product} key={product.unique_id} />
      ))}
    </View>
  );
}

export default Goods;
const styles = StyleSheet.create({
  rootcont: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 48,
    zIndex: 50,
    position: "relative",
  },
});
