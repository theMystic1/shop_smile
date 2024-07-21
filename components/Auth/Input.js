import { StyleSheet, Text, TextInput, View } from "react-native";

function Input({ label, error, ...InputOptions }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={[styles.label, error ? styles.labelError : null]}>
        {label}
      </Text>
      <TextInput
        {...InputOptions}
        style={[styles.input, error ? styles.errorInput : null]}
      />
      {error ? <Text style={styles.errorMsg}>{error}</Text> : null}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  rootContainer: {
    // height: 70,
    width: "100%",
    paddingVertical: 16,
    // marginVertical: ,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "#979797",
    fontWeight: "700",
  },
  labelError: {
    color: "red",
  },

  input: {
    height: 40,
    borderColor: "#979797",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    // flex: 1,
    color: "#979797",
    fontSize: 18,
    fontWeight: "600",
  },
  errorInput: {
    color: "red",
    fontSize: 18,
    borderColor: "red",
  },
  errorMsg: {
    color: "red",
    fontSize: 16,
    marginTop: 8,
  },
});
