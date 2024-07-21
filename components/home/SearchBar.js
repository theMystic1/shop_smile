import { Pressable, StyleSheet, View } from "react-native";
import Icons from "../ui/Icons";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../services/colors";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";

function SearchBar({ onHandleSearch }) {
  const [inputData, setInputData] = useState("");

  function handleInput(text) {
    setInputData(text);
    onHandleSearch(inputData);
  }
  return (
    <View style={styles.container}>
      <View style={styles.subCont}>
        <Icons name="search-outline" size={24} color={colors.secondary} />
        <TextInput
          placeholder="Search for Products...."
          style={styles.input}
          onChangeText={handleInput}
          value={inputData}
        />
      </View>
      <Pressable>
        <FontAwesome name="sliders" size={24} color={colors.secondary} />
      </Pressable>
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    height: 60,
    borderRadius: 6,
    padding: 8,
    borderWidth: 2,
    borderColor: colors.grey__color,
    marginTop: 28,
  },

  subCont: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    gap: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    borderWidth: 0,
    color: colors.text,
  },
});
