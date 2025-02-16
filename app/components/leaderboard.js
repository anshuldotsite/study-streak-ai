"use client";

import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch("/api/leaderboard");
        const data = await response.json();
        setLeaders(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Leaderboard 🏆</h2>
      {loading ? (
        <p>Loading leaderboard...</p>
      ) : leaders.length > 0 ? (
        <ul>
          {leaders.map((user, index) => (
            <li key={user.id} className="py-2 border-b">
              <span className="font-semibold">
                {index + 1}. {user.name}
              </span>{" "}
              - 🔥 {user.streak_count} day streak
            </li>
          ))}
        </ul>
      ) : (
        <p>No leaderboard data available.</p>
      )}
    </div>
  );
}
