import { Pressable, StyleSheet } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { SimpleLineIcons } from "@expo/vector-icons";

function Logout() {
  const { logout } = useAuth();
  return (
    <Pressable style={styles.cont} onPress={logout}>
      <SimpleLineIcons name="logout" size={24} color="#fff" />
    </Pressable>
  );
}

export default Logout;
const styles = StyleSheet.create({
  cont: {
    paddingRight: 16,
  },
});
