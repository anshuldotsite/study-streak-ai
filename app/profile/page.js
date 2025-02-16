"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Leaderboard from "../components/leaderboard";
import { Ripple } from "@/components/magicui/ripple";
import Sidebar from "../components/sidebar1";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const storedEmail = localStorage.getItem("email");

      if (!storedEmail) {
        console.error("No email found in localStorage. Redirecting to login.");
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`/api/auth?email=${encodeURIComponent(storedEmail)}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
        } else {
          console.error("Profile Fetch Error:", data.error);
          setError(data.error);
          localStorage.removeItem("email");
          router.push("/login");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, [router]);

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!user) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />
      <div className="flex-1 p-8 flex flex-col justify-center items-start ml-20">

        <h2 className="text-4xl text-orange-500 font-bold mb-10 self-center ">Personal Information</h2>
        <div className=" p-6 text-l rounded-lg shadow-lg w-96 ">
          <p className="mb-2 "><strong>Name:</strong> {user.name}</p>
          <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          <p className="mb-2"><strong>🔥 Streak:</strong> {user.streak_count} days</p>
          <p className="mb-2"><strong>🗓 Last Study Date:</strong> {new Date(user.last_study_date).toDateString()}</p>
          <p className="mb-4"><strong>🏆 Rewards:</strong> {user.rewards} points</p>
          <div className="flex justify-end space-x-4">
            <button 
              className="w-28 p-2 bg-orange-500 text-white rounded-md hover:bg-Orange-600 transition"
              onClick={() => router.push("/pomodo")}
            >
              Pomodoro Tracker
            </button>
            <button 
              className="w-28 p-2 bg-orange-500 text-white rounded-md hover:bg-Orange-600 transition"
              onClick={() => router.push("/summariser")}
            >
              Ai Chatbot
            </button>
            <button 
              className="w-28 p-2 bg-orange-500 text-white rounded-md hover:bg-Orange-600 transition"
              onClick={() => router.push("/rewards")}
            >
              Rewards Store
            </button>
          </div>
        </div>
      </div>
      <Ripple />
      <div className="w-80 p-6 rounded-lg mt-10 mx-4">
        <Leaderboard />
      </div>
      <div className="absolute bottom-4 w-full text-center p-4 bg-gray-900 text-white">
        <p>Using the software daily helps you maintain a streak, which moves you up the leaderboard.</p>
        <p>Engaging with features like the Pomodoro Tracker and AI Summarizer earns you reward points.</p>
        <p>These reward points can be used in the store to redeem vouchers and other exciting rewards.</p>
      </div>
    </div>
  );
}
