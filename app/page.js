"use client";

import { Ripple } from "@/components/magicui/ripple";
import { Globe } from "@/components/magicui/globe";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <Globe className="absolute inset-0 opacity-30 z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="py-6 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-500">
            Study Streak AI
          </h1>
          <div>
            <a
              href="/login"
              className="px-4 py-2 text-orange-500 font-bold text-xl"
            >
              Login
            </a>
            <a
              href="/register"
              className="px-4 py-2 text-orange-500 font-bold text-xl"
            >
              Signup
            </a>
          </div>
        </nav>

        <section className="text-center py-12 px-6">
          <div className="flex justify-center items-center text-4xl font-bold">
            <p className="bg-gradient-to-br from-white to-orange-500 inline-block text-transparent bg-clip-text">
              Optimize Your Study: Learn More, Earn Rewards, Win at Life
            </p>
          </div>
        </section>

        <section className="py-16 px-6 text-center max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Explore Our Features</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-4 relative">
                <span className="relative z-10">Pomodoro Timer</span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-orange-500 opacity-70"></span>
              </h3>
              <p className="mt-4 px-4 max-w-md text-gray-300 leading-relaxed">
                Stay focused and productive with our Pomodoro timer! Track your
                progress over time and earn rewards for every completed Pomodoro
                cycle.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-4 relative">
                <span className="relative z-10">AI Summarizer</span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-orange-500 opacity-70"></span>
              </h3>
              <p className="mt-4 px-4 max-w-md text-gray-300 leading-relaxed">
                Upload PDFs, notes, or textbook chapters and receive key points,
                concepts, and definitions organized for efficient revision and
                better retention with our AI.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold mb-4 relative">
                <span className="relative z-10">Rewards & Streaks</span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-orange-500 opacity-70"></span>
              </h3>
              <p className="mt-4 px-4 max-w-md text-gray-300 leading-relaxed">
                Build consistent study habits with our gamified rewards system.
                Maintain daily streaks and earn points that can be redeemed for
                exclusive partner offers.
              </p>
            </div>
          </div>
        </section>

        <footer className="py-6 text-center mt-auto">
          <p className="text-gray-400">
            &copy; 2024 Study Streak. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
