"use client";

import PomodoroTimer from "../components/pomodoroTimer";
import { Ripple } from "@/components/magicui/ripple";
import Sidebar1 from "../components/sidebar1";

export default function Pomodoro() {
  return (
    <div className="flex flex-col bg-black min-h-screen text-white justify-center items-center">
          <Sidebar1 />
          <h1 className="text-4xl font-bold text-center mb-28">
            You miss all the shots you don't take, so grind!!
          </h1>
          <PomodoroTimer />
          <Ripple />
        </div>
  );
}
