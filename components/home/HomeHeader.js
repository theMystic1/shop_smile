import { StyleSheet, View } from "react-native";
import SearchBar from "./SearchBar";
import CategoryHeader from "./CategoryHeader";
import Header from "../ui/Header";

function HomeHeader({ onHandleCategory, onHandleSearch }) {
  return (
    <View style={styles.rootCont}>
      <Header />
      <SearchBar onHandleSearch={onHandleSearch} />
      <CategoryHeader onHandleCategory={onHandleCategory} />
    </View>
  );
}

export default HomeHeader;

const styles = StyleSheet.create({
  rootCont: {
    marginBottom: 20,
  },
});
