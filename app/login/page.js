"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ripple } from "@/components/magicui/ripple";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    setError(null);
    try {
      const res = await fetch("/api/auth", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("✅ Login Successful: ${email} logged in.");
        localStorage.setItem("email", data.email);
        router.push("/profile");
      } else {
        console.error("Login Error:", data?.error || "Login failed");
        setError(data?.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col bg-black min-h-screen text-white justify-center items-center">
        <Ripple />
      <h1 className="text-4xl font-bold text-center mb-28">
        Welcome Back! Login to continue.
      </h1>
      <div className="p-6 border rounded-md shadow-md w-96 mx-auto mt-10 bg-gray-800">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="w-full p-2 border mb-4 rounded-md text-black"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border mb-4 rounded-md text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full p-2 bg-orange-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
