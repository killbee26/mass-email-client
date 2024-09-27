// services/auth.ts
import { setToken,getToken as fetchToken,removeToken } from "../utils/token";

export const login = async (username: string, password: string) => {
    const payload = { username, password };
    try {
      console.log(payload);
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (response.ok) {
        // Store JWT in localStorage
        setToken(data.token);
         // Assuming the token key is `token`
        return { success: true, data };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (error) {
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
  