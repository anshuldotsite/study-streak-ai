import PomodoroTimer from "../components/pomodoroTimer";
import StreakTracker from "../components/streakTracker";
import Leaderboard from "../components/leaderboard";

import { Ripple } from "@/components/magicui/ripple";

export function Dashboard() {
  return (
    <div className="bg-black min-h-screen text-white">
      <h1 className="flex flex-row justify-center items-center text-4xl font-bold h-72">
        You miss all the shots that you don't take, so grind!!
      </h1>
      <PomodoroTimer />
      {/* <StreakTracker /> */}
      {/* <Leaderboard /> */}
      <Ripple />
    </div>
  );
}
