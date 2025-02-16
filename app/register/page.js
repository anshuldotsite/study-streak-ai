"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ripple } from "@/components/magicui/ripple";

export default function Register() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegister = async () => {
    setError(null);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login");
      } else {
        setError(data?.error || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col bg-black min-h-screen text-white justify-center items-center">
      <h1 className="text-4xl font-bold text-center mb-10">
        Welcome to StudyStreak
      </h1>
      <h2 className="text-xl">Join Today to have a wonderful experience studing</h2>
      <div className="p-6 border rounded-md shadow-md w-96 mx-auto mt-10 bg-gray-800">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="w-full p-2 border mb-4 rounded-md text-black"
          type="text"
          placeholder="User ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          className="w-full p-2 border mb-4 rounded-md text-black"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          className="w-full p-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
       <Ripple />
    </div>
  );
}
