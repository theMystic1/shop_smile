import { Image, StyleSheet, Text, View } from "react-native";
import SubTitle from "../ui/SubTitle";
import { colors } from "../../services/colors";

function PayMethod() {
  return (
    <View>
      <SubTitle>Payment Method</SubTitle>
      <View style={styles.rootCont}>
        <View style={styles.top}>
          <SubTitle>Paystack</SubTitle>
          <Image source={require("../../assets/paymethod.png")} />
        </View>
        <View style={styles.payBox}>
          <Image source={require("../../assets/Vector.png")} />

          <Text style={styles.text}>
            After clicking “pay now” you will be redirected to paystack to
            complete your purchase securely.
          </Text>
        </View>
      </View>
    </View>
  );
}

export default PayMethod;

const styles = StyleSheet.create({
  rootCont: {
    flex: 1,
    height: 300,
    marginBottom: 20,
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 8,
    backgroundColor: colors.light_pink,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    height: "30%",
  },

  payBox: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: colors.primary,
    padding: 20,
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: colors.text,
    borderTopWidth: 0,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 20,
  },
});
