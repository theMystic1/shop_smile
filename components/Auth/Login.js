import { Alert, StyleSheet, View } from "react-native";
import Input from "./Input";
import { useState } from "react";

import Message from "./Message";
import { useNavigation } from "@react-navigation/native";
import { signIn } from "../../services/auth";
import { useAuth } from "../../contexts/AuthContext";
import PageTitle from "../ui/PageTitle";
import Button from "../ui/Button";
import Indicator from "../ui/Indicator";
import { colors } from "../../services/colors";

function Login() {
  const { navigate } = useNavigation();
  const { authenticate } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn(email, password) {
    setIsLoading(true);
    try {
      const data = await signIn(email, password);
      authenticate(data.idToken);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const [value, setValue] = useState({
    email: {
      isValid: true,
      email: "",
      emailError: "",
    },
    password: {
      isValid: true,
      password: "",
      passwordError: "",
    },
  });

  function handleEmailChange(text) {
    setValue((prevState) => ({
      ...prevState,
      email: { ...prevState.email, email: text, isValid: true, emailError: "" },
    }));
  }

  function handlePasswordChange(text) {
    setValue((prevState) => ({
      ...prevState,
      password: {
        ...prevState.password,
        password: text,
        isValid: true,
        passwordError: "",
      },
    }));
  }

  function handleSubmit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value.email.email || !value.password.password) {
      return;
    }
    const isEmailValid = emailRegex.test(value.email.email);
    const isPasswordValid = value.password.password.length >= 8;

    setValue((prevState) => ({
      ...prevState,
      email: {
        ...prevState.email,
        isValid: isEmailValid,
        emailError: isEmailValid ? "" : "Invalid email address",
      },
      password: {
        ...prevState.password,
        isValid: isPasswordValid,
        passwordError: isPasswordValid
          ? ""
          : "Password must be at least 8 characters",
      },
    }));

    if (isEmailValid && isPasswordValid) {
      handleSignIn(value.email.email, value.password.password);
    }
  }

  return (
    <View style={styles.rootContainer}>
      <PageTitle style={styles.header}>Welcome back !!</PageTitle>
      <Input
        label="Email:"
        inputMode="text"
        autoCapitalize={false}
        onChangeText={handleEmailChange}
        value={value.email.email}
        error={value.email.emailError}
      />
      <Input
        label="Password:"
        onChangeText={handlePasswordChange}
        value={value.password.password}
        error={value.password.passwordError}
        secureTextEntry={true}
      />
      <Message
        message="Don't have an account?"
        page="Sign Up"
        onPress={() => navigate("SignUp")}
      />
      <Button style={styles.btn} onPress={handleSubmit}>
        {isLoading ? <Indicator /> : " Sign in"}
      </Button>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 20,
    padding: 20,
  },

  header: {
    // fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.tertiary,
  },

  text: {
    color: "#979797",
    flexDirection: "row",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginVertical: 20,
  },
  pressableTxt: {
    fontSize: 16,
    color: colors.tertiary,
    textDecorationLine: "underline",
    marginLeft: 8,
  },
  btn: {
    backgroundColor: colors.tertiary,
    marginTop: 16,
  },
});
