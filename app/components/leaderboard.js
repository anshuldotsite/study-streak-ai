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
    <div className="flex flex-col bg-black rounded-lg space-y-6">
      <h2 className="text-xl font-semibold">Leaderboard</h2>
      {loading ? (
        <p>Loading leaderboard...</p>
      ) : leaders.length > 0 ? (
        <ul className="text-lg font-semibold">
          {leaders.slice(0, 5).map((user, index) => (
            <li key={user.id} className="py-2 flex items-center">
              <span className="font-semibold mr-2">{index + 1}.</span>
              <span className="mr-4">{user.name}</span>
              <span className="ml-auto">🔥 {user.streak_count}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No leaderboard data available.</p>
      )}
    </div>
  );
}
