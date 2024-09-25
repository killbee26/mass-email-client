'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import Navbar from "@/components/ui/Navbar"; // Import Navbar component

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

    // Construct the request payload
    const payload = {
      email,
      username,
      password,
    };
    console.log(payload);
    

    try {
      // Send a POST request to your API
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Send data as JSON
        },
        body: JSON.stringify(payload), // Convert payload to JSON
      });

      console.log(payload);

      const data = await response.json();

      if (response.ok) {
        // Handle successful response
        setSuccess(true);
         // Redirect to login page after 2 seconds
         setTimeout(() => {
          router.push("/login"); // Use useRouter to navigate to the login page
        }, 2000); // Optional delay to show success message
      } else {
        // Handle error response
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      // Catch any other errors
      setError("Error submitting the form, please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <Navbar /> {/* Add Navbar to the page */}

      {/* Centered content below the navbar */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mt-20">
        <h2 className="text-2xl font-bold mb-6 text-black">Register</h2>

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
