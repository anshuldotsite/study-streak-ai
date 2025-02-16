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

  return (
    <div>
      <h2>
        {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </h2>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Pause" : "Start"}
      </button>
    </div>
  );
}
