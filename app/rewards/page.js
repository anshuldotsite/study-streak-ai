"use client";
import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar1";
import { Ripple } from "@/components/magicui/ripple";

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [userRewards, setUserRewards] = useState(0);

  // Get the email from localStorage
  const storedEmail = typeof window !== "undefined" ? localStorage.getItem("email") : null;

  useEffect(() => {
    if (!storedEmail) {
      alert("User not logged in.");
      return;
    }

    async function fetchRewards() {
      try {
        const res = await fetch("/api/rewards");
        const data = await res.json();
        setRewards(data);
      } catch (error) {
        console.error("Error fetching rewards:", error);
      }
    }

    async function fetchUserRewards() {
      try {
        const res = await fetch(`/api/user/rewards?email=${storedEmail}`);
        const data = await res.json();
        setUserRewards(data.points || 0);
      } catch (error) {
        console.error("Error fetching user rewards:", error);
      }
    }

    fetchRewards();
    fetchUserRewards();
  }, [storedEmail]);

  const handleRedeem = async (rewardId) => {
    if (!storedEmail) {
      alert("User not logged in.");
      return;
    }

    try {
      const res = await fetch("/api/rewards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: storedEmail, rewardId }),
      });

      const data = await res.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert(`Redeemed: ${data.coupon}`);
        setUserRewards((prev) => prev - data.cost);
      }
    } catch (error) {
      console.error("Error redeeming reward:", error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <Ripple />
      <Sidebar />

      <h2 className="text-4xl font-bold text-orange-500 text-center mb-6">Rewards Store</h2>
      <p className="text-center text-orange-500 text-lg">
        Your Points: <span className="font-semibold">{userRewards}</span>
      </p>
      <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((reward) => (
          <li key={reward.id} className="bg-gray-900 p-6 text-orange-500 rounded-lg shadow-lg">
            <h3 className="text-xl text-orange-500 font-semibold">{reward.name}</h3>
            <p className="mt-2">
              Cost: <span className="font-bold">{reward.cost}</span> points
            </p>
            <button
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
              onClick={() => handleRedeem(reward.id)}
              disabled={userRewards < reward.cost}
            >
              {userRewards >= reward.cost ? "Redeem" : "Not Enough Points"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
