// services/auth.ts
import axios from "axios";
import { setToken,getToken as fetchToken,removeToken } from "../utils/token";
import api from "../utils/api";

export const login = async (username: string, password: string) => {
  const payload = { username, password };
  try {
    console.log(payload);
    const response = await api.post("/auth/login", payload); // Use the api client here

    if (response.status === 200) {
      // Store JWT in localStorage
      setToken(response.data.token); // Assuming setToken is a function defined to store the token
      return { success: true, response };
    } else {
      return { success: false, message: response.data.message || "Login failed" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Network error" };
  }
};
  
  export const logout = () => {
    // Remove the token from localStorage
    removeToken();
  };
  
  export const getToken = () => {
    // Retrieve the token from localStorage
    return fetchToken();
  };
  