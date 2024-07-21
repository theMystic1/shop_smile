import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "AIzaSyDgMrHeBbF1JZjYINfyh-DGcepjhuIlElQ";
const URL = `https://identitytoolkit.googleapis.com/v1/accounts`;

async function Authenticate(type, email, password) {
  const res = await axios.post(`${URL}:${type}?key=${API_KEY}`, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  return res.data;
}

export async function createUser(email, password) {
  const data = await Authenticate("signUp", email, password);
  await storeAuthData(data);
  return data;
}

export async function signIn(email, password) {
  const data = await Authenticate("signInWithPassword", email, password);
  await storeAuthData(data);
  return data;
}

async function storeAuthData(data) {
  await AsyncStorage.setItem("authToken", data.idToken);
  await AsyncStorage.setItem("refreshToken", data.refreshToken);
  await AsyncStorage.setItem(
    "expiresIn",
    (Date.now() + data.expiresIn * 1000).toString()
  );
}

export async function refreshAuthToken() {
  const refreshToken = await AsyncStorage.getItem("refreshToken");

  if (refreshToken) {
    const res = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
      {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }
    );

    const newToken = res.data.id_token;
    const expiresIn = res.data.expires_in;

    await AsyncStorage.setItem("authToken", newToken);
    await AsyncStorage.setItem(
      "expiresIn",
      (Date.now() + expiresIn * 1000).toString()
    );

    return newToken;
  }

  throw new Error("No refresh token available");
}
