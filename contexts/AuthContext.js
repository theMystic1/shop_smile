import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);

  async function authenticate(token) {
    setAuthToken(token);
    await AsyncStorage.setItem("authToken", token);
  }

  async function logout() {
    setAuthToken(null);
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("expiresIn");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Auth context must be used within the AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
