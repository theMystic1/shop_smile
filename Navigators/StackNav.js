import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./BottomTabs";
import ProductItemScreen from "../screens/ProductItemScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../services/colors";
import Icons from "../components/ui/Icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import Indicator from "../components/ui/Indicator";
import AuthScreenLogin from "../screens/AuthScreenLogin";
import AuthScreenSignUp from "../screens/AuthScreenSignUp";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();

function AuthScreens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: false,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.tertiary,
      }}
    >
      <Stack.Screen name="SignUp" component={AuthScreenSignUp} />

      <Stack.Screen name="Login" component={AuthScreenLogin} />
    </Stack.Navigator>
  );
}

function ManScreens() {
  const { goBack } = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product"
        component={ProductItemScreen}
        options={{
          headerBackTitleVisible: false,
          headerLeft: ({ size, color }) => (
            <Pressable style={{ marginLeft: 16 }} onPress={goBack}>
              <AntDesign name="leftcircle" size={28} color={colors.tertiary} />
            </Pressable>
          ),
          headerRight: ({}) => (
            <Pressable style={{ marginRight: 16 }}>
              <Icons name="lock-closed-outline" size={24} />
            </Pressable>
          ),
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerTintColor: colors.tertiary,
          headerBackTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <ManScreens /> : <AuthScreens />;
}

function StackNav() {
  const { authenticate, logout } = useAuth();
  const [isLoginin, setIsLoginin] = useState(true);
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const expiresIn = await AsyncStorage.getItem("expiresIn");

        if (token && expiresIn && Date.now() < parseInt(expiresIn, 10)) {
          authenticate(token);
          scheduleTokenRefresh(parseInt(expiresIn, 10) - Date.now());
        } else {
          await logout();
        }
      } catch (error) {
        console.warn(error.message);
      } finally {
        setIsLoginin(false);
      }
    };

    loadToken();
  }, []);

  async function refresh() {
    try {
      const newToken = await refreshAuthToken();
      authenticate(newToken);
      scheduleTokenRefresh(3600 * 1000); // Schedule the next refresh in 1 hour
    } catch (error) {
      console.error("Failed to refresh token", error);
      logout();
    }
  }

  function scheduleTokenRefresh(delay) {
    setTimeout(() => {
      refresh();
    }, delay);
  }

  if (isLoginin) return <Indicator />;
  return <AuthStack />;
}

export default StackNav;
