'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import Navbar from "@/components/ui/Navbar"; // Import Navbar component
import axios from "axios";
import { register } from "../services/register";

const RegisterPage = () => {
  // State for form inputs
  const router = useRouter(); // Initialize useRouter
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle any error messages
  const [success, setSuccess] = useState(false); // To show success message
 
  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the page from refreshing
    setError(""); // Reset error state before submission
    setSuccess(false); // Reset success state before submission

    // Call login service
    const result = await register(email, username, password);
    console.log(result);

    if (result.success) {
      setSuccess(true);
      
      // Redirect to dashboard after successful login
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      setError(result.message);
    }
   
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Navbar /> {/* Add Navbar to the page */}

      {/* Centered content below the navbar */}
      <div className="w-full max-w-md bg-background rounded-lg shadow-md p-6 mt-20">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Register</h2>

        {/* Success Message */}
        {success && <p className="text-green-500 mb-4">Registration successful!</p>}

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <Input
              type="text"
              placeholder="Enter your username"
              className="w-full mt-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update state
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state
            />
          </div>

          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
