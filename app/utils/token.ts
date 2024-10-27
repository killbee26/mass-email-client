// utils/token.ts

export const setToken = (token: string) => {
    localStorage.setItem("token", token);
  };
  
  export const getToken = (): string | null => {
    if (typeof window === "undefined") {
      // We're on the server, return null or a default value
      return null;
    }
    return localStorage.getItem("token");
  };
  
  export const removeToken = () => {
    localStorage.removeItem("token");
  };
  