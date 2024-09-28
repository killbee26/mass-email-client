import axios from "axios";

export const register = async(email:String,username: String,password:String) => {

    const payload = { email,username,password};
    try {
        console.log(payload);
        const response = await axios.post("http://localhost:5000/api/auth/register",payload);
    
        // const data = await response.data();
        if (response.status === 201) {
          // Store JWT in localStorage
          
           // Assuming the token key is `token`
          return { success: true, response };
        } else {
          return { success: false, message: response.data.message || "Registration failed" };
        }
      } catch (error) {
        console.log(error);
        return { success: false, message: "Network error" };
      }

}