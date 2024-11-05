// app/login/page.tsx
'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/Navbar"; // Import Navbar component
import { useRouter } from "next/navigation";
import { login } from "../services/auth";

const LoginPage = () => {

  //state for form inputs
  const router = useRouter(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle any error messages
  const [success, setSuccess] = useState(false); // To show success message



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    

    // Call login service
    const result = await login(username, password);

    if (result.success) {
      setSuccess(true);
      // Redirect to dashboard after successful login
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      setError(result.message);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Navbar /> {/* Add Navbar to the page */}

      {/* Centered content below the navbar */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mt-20">
        <h2 className="text-2xl font-bold mb-6 text-black">Login</h2>
        {/* Success Message */}
        {success && <p className="text-green-500 mb-4">Login successful!</p>}

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <Input type="text" placeholder="Enter your username" className="w-full mt-2" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Input type="password" placeholder="Enter your password" className="w-full mt-2" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <Button type="submit" className="w-full text-white hover:bg-muted-foreground">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
