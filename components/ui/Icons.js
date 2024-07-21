import { Ionicons } from "@expo/vector-icons";

function Icons({ name, color, size, style }) {
  return <Ionicons name={name} size={size} color={color} style={style} />;
}

export default Icons;
