// services/auth.ts
import axios from "axios";
import { setToken,getToken as fetchToken,removeToken } from "../utils/token";

export const login = async (username: string, password: string) => {
    const payload = { username, password };
    try {
      console.log(payload);
      const response = await axios.post("http://localhost:5000/api/auth/login",payload);
  
      // const data = await response.data();
      if (response.status === 200) {
        // Store JWT in localStorage
        setToken(response.data.token);
         // Assuming the token key is `token`
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
  