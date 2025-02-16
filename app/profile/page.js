"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Leaderboard from "../components/leaderboard";
import { Ripple } from "@/components/magicui/ripple";
import Sidebar from "../components/sidebar";

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
        const res = await fetch(
          `/api/auth?email=${encodeURIComponent(storedEmail)}`
        );
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
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <div className="flex flex-col flex-1 justify-center items-center px-8 py-12">
        <h2 className="text-4xl text-orange-500 font-bold mb-10">
          Your Profile:
        </h2>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6 text-lg">
            <div className="flex justify-between pb-2">
              <span className="font-semibold">Name:</span>{" "}
              <span>{user.name}</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="font-semibold">Email:</span>{" "}
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="font-semibold">Streak:</span>{" "}
              <span>🔥 {user.streak_count}</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="font-semibold">Last Study Date:</span>
              <span>{new Date(user.last_study_date).toDateString()}</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="font-semibold">Rewards:</span>{" "}
              <span>{user.rewards} points</span>
            </div>
          </div>

          <div className="md:pl-12">
            <Leaderboard />
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-10">
          <button
            className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-xl text-lg"
            onClick={() => router.push("/pomodoro")}
          >
            Pomodoro Tracker
          </button>
          <button
            className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-xl text-lg"
            onClick={() => router.push("/summariser")}
          >
            AI Chatbot
          </button>
          <button
            className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-xl text-lg"
            onClick={() => router.push("/rewards")}
          >
            Rewards Store
          </button>
        </div>
      </div>

      <Ripple />
    </div>
  );
}
