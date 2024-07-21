import { Alert, StyleSheet, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
// import Header from "../Header";
// import Button from "../Button";
import Message from "./Message";
import { useNavigation } from "@react-navigation/native";
import { createUser } from "../../services/auth";
import { colors } from "../../services/colors";
import Button from "../ui/Button";
import Indicator from "../ui/Indicator";
import PageTitle from "../ui/PageTitle";

function Signup() {
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
    confirmPassword: {
      isValid: true,
      confirmPassword: "",
      confirmPasswordError: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const { navigate } = useNavigation();

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

  function handleConfirmPasswordChange(text) {
    setValue((prevState) => ({
      ...prevState,
      confirmPassword: {
        ...prevState.confirmPassword,
        confirmPassword: text,
        isValid: true,
        confirmPasswordError: "",
      },
    }));
  }
  async function handleSignUp(email, password) {
    setIsLoading(true);
    try {
      const data = await createUser(email, password);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
      navigate("Login");
    }
  }

  function handleSubmit() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !value.email.email ||
      !value.password.password ||
      !value.confirmPassword.confirmPassword
    ) {
      return;
    }
    const isEmailValid = emailRegex.test(value.email.email);
    const isPasswordValid = value.password.password.length >= 8;
    const isConfirmPasswordValid =
      value.confirmPassword.confirmPassword === value.password.password;

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
      confirmPassword: {
        ...prevState.confirmPassword,
        isValid: isConfirmPasswordValid,
        confirmPasswordError: isConfirmPasswordValid
          ? ""
          : "Passwords do not match",
      },
    }));

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      handleSignUp(value.email.email, value.password.password);
    }
  }

  return (
    <View style={styles.rootContainer}>
      <PageTitle style={styles.header}>
        Welcome to Shop & smile, Please Sign up to shop with us
      </PageTitle>
      <Input
        label="Email:"
        inputMode="text"
        onChangeText={handleEmailChange}
        value={value.email.email}
        error={value.email.emailError}
        autoCapitalize={false}
      />
      <Input
        label="Password:"
        onChangeText={handlePasswordChange}
        value={value.password.password}
        error={value.password.passwordError}
        secureTextEntry={true}
      />
      <Input
        label="Confirm Password:"
        onChangeText={handleConfirmPasswordChange}
        value={value.confirmPassword.confirmPassword}
        error={value.confirmPassword.confirmPasswordError}
        secureTextEntry={true}
      />
      <Message
        message="Already have an account?"
        page="Login"
        onPress={() => navigate("Login")}
      />
      <Button style={styles.btn} onPress={handleSubmit}>
        {isLoading ? <Indicator /> : " Sign up"}
      </Button>
    </View>
  );
}

export default Signup;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 20,
    padding: 20,
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
    color: colors.tertiary,
  },
  btn: {
    backgroundColor: colors.tertiary,
    marginTop: 16,
  },
});
