import PomodoroTimer from "../components/pomodoroTimer";
import Sidebar from "../components/sidebar";
import { Ripple } from "@/components/magicui/ripple";

export function Dashboard() {
  return (
    <div className="flex flex-col bg-black min-h-screen text-white justify-center items-center">
      <Sidebar />
      <h1 className="text-4xl font-bold text-center mb-28">
        You miss all the shots you don't take, so grind!!
      </h1>
      <PomodoroTimer />
      <Ripple />
    </div>
  );
}
