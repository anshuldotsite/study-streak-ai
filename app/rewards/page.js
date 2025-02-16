"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/sidebar";
import { Ripple } from "@/components/magicui/ripple";

export default function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [user, setUser] = useState(null); // Store full user object
  const [redeemedCoupons, setRedeemedCoupons] = useState({}); // Track redeemed coupons
  const router = useRouter();

  useEffect(() => {
    const storedEmail =
      typeof window !== "undefined" ? localStorage.getItem("email") : null;

    if (!storedEmail) {
      alert("User not logged in.");
      router.push("/login");
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

    async function fetchUserProfile() {
      try {
        const res = await fetch(
          `/api/auth?email=${encodeURIComponent(storedEmail)}`
        );
        const data = await res.json();

        if (res.ok) {
          setUser(data.user); // Store full user object
        } else {
          console.error("Profile Fetch Error:", data.error);
          localStorage.removeItem("email");
          router.push("/login");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        localStorage.removeItem("email");
        router.push("/login");
      }
    }

    fetchRewards();
    fetchUserProfile();
  }, [router]);

  const handleRedeem = async (rewardId, rewardCost) => {
    const storedEmail =
      typeof window !== "undefined" ? localStorage.getItem("email") : null;
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
        // Store the coupon for the redeemed reward
        setRedeemedCoupons((prevCoupons) => ({
          ...prevCoupons,
          [rewardId]: data.coupon,
        }));

        // Update user's rewards balance in the UI
        setUser((prevUser) => ({
          ...prevUser,
          rewards: prevUser.rewards - rewardCost,
        }));
      }
    } catch (error) {
      console.error("Error redeeming reward:", error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <Ripple />
      <Sidebar />

      <h2 className="text-4xl font-bold text-orange-500 text-center mb-6">
        Rewards Store
      </h2>
      <p className="text-center text-orange-500 text-lg">
        Your Points: <span className="font-semibold">{user?.rewards || 0}</span>
      </p>
      <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(rewards) && rewards.length > 0 ? (
          rewards.map((reward) => (
            <li
              key={reward.id}
              className="bg-black p-6 text-orange-500 rounded-lg shadow-lg"
            >
              <h3 className="text-xl text-orange-500 font-semibold">
                {reward.name}
              </h3>
              <p className="mt-2">
                Cost: <span className="font-bold">{reward.cost}</span> points
              </p>
              <button
                className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
                onClick={() => handleRedeem(reward.id, reward.cost)}
                disabled={user?.rewards < reward.cost}
              >
                {user?.rewards >= reward.cost ? "Redeem" : "Not Enough Points"}
              </button>
              {/* Show coupon if redeemed */}
              {redeemedCoupons[reward.id] && (
                <p className="mt-2 text-green-400">
                  Coupon Code:{" "}
                  <span className="font-bold">
                    {redeemedCoupons[reward.id]}
                  </span>
                </p>
              )}
            </li>
          ))
        ) : (
          <p className="text-center text-gray-400">No rewards available.</p>
        )}
      </ul>
    </div>
  );
}
