// app/login/page.tsx
'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/Navbar"; // Import Navbar component
import { useRouter } from "next/navigation";

const LoginPage = () => {

  //state for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle any error messages
  const [success, setSuccess] = useState(false); // To show success message



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const payload = {
      username,
      password,
    };
    console.log(payload);
    const router = useRouter
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <Navbar /> {/* Add Navbar to the page */}

      {/* Centered content below the navbar */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mt-20">
        <h2 className="text-2xl font-bold mb-6 text-black">Login</h2>

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input type="email" placeholder="Enter your email" className="w-full mt-2" />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Input type="password" placeholder="Enter your password" className="w-full mt-2" />
          </div>

          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
