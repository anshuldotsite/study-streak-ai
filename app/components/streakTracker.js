"use client";

import { useState, useEffect } from "react";

export default function StreakTracker() {
  const [streak, setStreak] = useState(0);
  const userId = "user456"; // Replace this with actual user ID logic

  useEffect(() => {
    async function fetchStreak() {
      try {
        const response = await fetch(`/api/streak`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        if (response.ok) {
          const data = setStreak(data.streak_count || 0);
        }
      } catch (error) {
        console.error("Error fetching streak:", error);
      }
    }

    fetchStreak();
  }, []);

  return (
    <div className="flex flex-row bg-black text-white text-xl font-semibold gap-x-10">
      <span>Your Current Streak</span>
      <span>🔥 {streak}</span>
    </div>
  );
}
