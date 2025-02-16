"use client";

import { useState, useEffect } from "react";

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [rewardGiven, setRewardGiven] = useState(false); // Prevents multiple rewards per session
  const [userEmail, setUserEmail] = useState(null); // State to store user email

  useEffect(() => {
    const storedEmail = typeof window !== "undefined" ? localStorage.getItem("email") : null;
    if (storedEmail) {
      setUserEmail(storedEmail); // Set the email from localStorage
    } else {
      console.error("No user email found in localStorage");
    }
  }, []);

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            setIsActive(false);
            if (!rewardGiven) {
              giveReward();
            }
          }
          return prev > 0 ? prev - 1 : 0;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  const giveReward = async () => {
    if (!userEmail) return; // Ensure email exists before making request

    try {
      const response = await fetch("/api/rewards", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          pointsToAdd: 10,
        }),
      });

      
        alert("🎉 You earned 10 reward points!");
       
    } catch (error) {
      console.error("Error adding rewards:", error);
    }
  };

  const handleReset = () => {
    setTimeLeft(1500);
    setIsActive(false);
    setRewardGiven(false); // Reset reward tracking for the next session
  };

  return (
    <div className="flex flex-col items-center mb-56">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-7xl font-bold mb-6">
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </h1>
        <button
          className={`px-2 py-3 text-2xl font-bold rounded-2xl ${
            isActive ? "bg-red-500" : "bg-orange-600"
          }`}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? "Pause" : "Finish a pomodoro, get a reward!"}
        </button>
        <button
          className="mt-8 px-4 py-2 text-2xl font-semibold rounded-2xl bg-gray-600"
          onClick={handleReset}
        >
          Reset Timer
        </button>
      </div>
    </div>
  );
}
