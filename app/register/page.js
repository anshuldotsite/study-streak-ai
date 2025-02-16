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
      <h1 className="text-4xl bg-gradient-to-br from-white to-orange-500 inline-block text-transparent bg-clip-text text-center mb-10">
        Welcome to StudyStreak AI
      </h1>
      <h2 className="text-4xl bg-gradient-to-br from-white to-orange-500 inline-block text-transparent bg-clip-text">
        Join now to have a wonderful experience!
      </h2>
      <div className="p-6 rounded-md w-96 mx-auto mt-10">
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="w-full p-2 mb-4 rounded-md text-black"
          type="text"
          placeholder="User ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 rounded-md text-black"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 rounded-md text-black"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 rounded-md text-black"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full p-2 bg-orange-500 text-white rounded-md font-semibold text-xl"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
      <Ripple />
    </div>
  );
}
