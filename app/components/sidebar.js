"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import StreakTracker from "../components/streakTracker";
import Leaderboard from "../components/leaderboard";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-orange-500 text-white rounded-full"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>

      <aside
        className={`fixed top-0 left-0 w-80 bg-black text-white min-h-screen p-6 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-80"
        }`}
      >
        <h2 className="text-2xl font-bold mt-12 mb-4">Your Progress:</h2>
        <StreakTracker />
        <Leaderboard />
      </aside>
    </>
  );
}
