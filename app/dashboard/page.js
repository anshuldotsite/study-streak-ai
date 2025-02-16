import PomodoroTimer from "../components/pomodoroTimer";
import StreakTracker from "../components/streakTracker";
import Leaderboard from "../components/leaderboard";

export function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Study Streak Dashboard</h1>
      <PomodoroTimer />
      <StreakTracker />
      <Leaderboard />
    </div>
  );
}
