"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const storedEmail = localStorage.getItem("email");
      
      // Ensure we have an email stored
      if (!storedEmail) {
        console.error("No email found in localStorage. Redirecting to login.");
        router.push("/login");
        return;
      }

      try {
        console.log("Fetching profile for ${storedEmail}");

        const res = await fetch(`/api/auth?email=${encodeURIComponent(storedEmail)}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
        } else {
          console.error("Profile Fetch Error:", data.error);
          setError(data.error);
          localStorage.removeItem("email");
          router.push("/login");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, [router]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 border rounded-md shadow-md w-96 mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>🔥 Streak:</strong> {user.streak_count} days</p>
      <p><strong>🗓 Last Study Date:</strong> {new Date(user.last_study_date).toDateString()}</p>
      <p><strong>🏆 Rewards:</strong> {user.rewards} points</p>
      <button 
        className="w-full p-2 bg-red-500 text-white mt-4" 
        onClick={() => {
          localStorage.removeItem("email");
          router.push("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}