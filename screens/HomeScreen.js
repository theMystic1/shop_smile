import { ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../services/colors";
import HomeHeader from "../components/home/HomeHeader";
import Goods from "../components/home/Goods";
import { useEffect, useState } from "react";
import { allProducts } from "../services/http";
import Indicator from "../components/ui/Indicator";

function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    async function getAllProducts() {
      try {
        const data = await allProducts();
        setProducts(data.items);
        setFilteredProducts(data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    getAllProducts();
  }, []);

  function handleCurCategory(categoryName) {
    if (categoryName === "All") {
      setFilteredProducts(products);
    } else {
      const data = products.filter(
        (product) =>
          product.categories[0].name.toLowerCase() ===
          categoryName.toLowerCase()
      );
      setFilteredProducts(data);
    }
  }

  function handleSearch(searchQuery) {
    setSearchError("");
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
      return;
    }

    const data = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (data.length === 0) {
      setSearchError("No results found");
    } else {
      setSearchError("");
    }
    setFilteredProducts(data);
  }

  if (isLoading) return <Indicator />;

  return (
    <ScrollView style={styles.rootContainer}>
      <HomeHeader
        onHandleCategory={handleCurCategory}
        onHandleSearch={handleSearch}
      />
      <Goods products={filteredProducts} searchError={searchError} />
    </ScrollView>
  );
}

export default HomeScreen;

export const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: colors.primary,
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 20,
  },
});
