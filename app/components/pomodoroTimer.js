"use client";

import { useState, useEffect } from "react";

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  const handleReset = () => {
    setTimeLeft(1500);
    setIsActive(false);
  };

  return (
    <div className="flex flex-col items-center mt-28">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-6xl font-bold mb-4">
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </h1>
        <button
          className={`px-2 py-3 text-2xl font-bold transition-all rounded-2xl ${
            isActive ? "bg-red-500" : "bg-orange-600"
          }`}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? "Pause" : "Complete a pomodoro to win a reward!!"}
        </button>
        <button
          className="mt-4 px-4 py-2 text-xl font-semibold rounded-2xl  bg-gray-600 hover:bg-gray-700 transition-all"
          onClick={handleReset}
        >
          Reset Timer
        </button>
      </div>
    </div>
  );
}
