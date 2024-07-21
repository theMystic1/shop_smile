import { View, StyleSheet, Text, Pressable } from "react-native";
import { colors } from "../../services/colors";
import Icons from "../ui/Icons";
import { useState } from "react";

function CategoryHeader({ onHandleCategory }) {
  const categories = ["All", "Bags", "Heels", "Sneakers"];
  const [category, setCategory] = useState(categories[0]);
  const [showCategories, setShowCategories] = useState(false);

  function handleCat(cat) {
    setCategory(cat);
    setShowCategories(false);
    onHandleCategory(cat);
  }

  function handleShowCat() {
    setShowCategories((showCategories) => !showCategories);
  }

  return (
    <View style={styles.rootCont}>
      <Text style={styles.catLabel}>Category</Text>
      <View>
        <Text style={styles.category}>{category}</Text>
        <Pressable style={styles.iconContainer} onPress={handleShowCat}>
          <Icons name="menu" size={24} color={colors.secondary} />
          {showCategories ? (
            <View style={styles.catContainer}>
              {categories.map((cat) => (
                <Pressable
                  key={cat}
                  onPress={() => handleCat(cat)}
                  style={styles.catItem}
                >
                  <Text style={styles.category}>{cat}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </Pressable>
      </View>
    </View>
  );
}

export default CategoryHeader;

const styles = StyleSheet.create({
  rootCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "t",
    marginTop: 16,
    zIndex: 100,
    position: "relative",
  },

  category: {
    color: colors.tertiary,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  catLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
  },

  contain: {},

  iconContainer: {
    marginTop: 18,
    flexDirection: "row",
    gap: 4,
    zIndex: 100,
  },

  catContainer: {
    position: "absolute",
    top: -100,
    right: 40,
    height: 150,
    width: 150,
    backgroundColor: colors.gray,
    elevation: 10,
    shadowColor: "#000000", // Darker shadow color
    shadowOpacity: 0.5, // Increase opacity for a darker shadow
    shadowRadius: 6, // Slightly increase shadow radius
    shadowOffset: { width: 2, height: 4 },
    zIndex: 100,
    borderRadius: 8,
    overflow: "hidden",
  },

  catItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
