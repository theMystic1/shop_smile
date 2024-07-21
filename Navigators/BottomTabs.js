import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CartScreen from "../screens/CartScreen";
import Icons from "../components/ui/Icons";
import { colors } from "../services/colors";

const BottomTab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        title: "",
        tabBarActiveTintColor: colors.tertiary,
      }}
    >
      <BottomTab.Screen
        name="Items"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Icons name="home" size={size} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Icons name="bag-remove-outline" size={size} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Icons name="heart-outline" size={size} color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Icons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabs;
