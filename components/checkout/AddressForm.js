import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SubTitle from "../ui/SubTitle";
import { colors } from "../../services/colors";
import Button from "../ui/Button";
// import { styles } from "../../screens/HomeScreen";

function AddressForm() {
  return (
    <View>
      <SubTitle>Delivery Address</SubTitle>
      <View style={styles.rootCont}>
        <Text style={styles.txt}>Lucky</Text>
        <KeyboardAvoidingView
          style={styles.inpCont}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <InputField placeholder="Street no" />
          <InputField placeholder=" State" />
          <InputField
            placeholder="+234 811 55235"
            style={{ borderRightWidth: 0 }}
          />
          <Button style={styles.btn}>Edit</Button>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

function InputField({ style, ...props }) {
  return <TextInput {...props} style={[styles.inp, style]} />;
}

export default AddressForm;

const styles = StyleSheet.create({
  rootCont: {
    height: 100,
    width: "100%",
    borderRadius: 16,
    backgroundColor: colors.primary,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  inpCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "55%",
  },

  txt: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },

  inp: {
    borderRightWidth: 1,
    borderRightColor: colors.secondary,
    padding: 4,
    fontSize: 12,
    color: colors.text,
  },
  btn: {
    width: 100,
    fontSize: 12,
  },
});
