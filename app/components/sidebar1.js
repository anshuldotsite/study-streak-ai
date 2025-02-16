"use client";

import { useState, useEffect } from "react";
import { Menu, Home, LogIn, LogOut, User, Timer, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const storedEmail = localStorage.getItem("email");

      if (!storedEmail) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`/api/auth?email=${encodeURIComponent(storedEmail)}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data.user);
        } else {
          setError(data.error);
          localStorage.removeItem("email");
          router.push("/login");
        }
      } catch (err) {
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, [router]);

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

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
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-2xl ml-20 font-bold mb-6">Hello, {user ? user.name : "Guest"}!</h2>

            <div className="space-y-4">
              {/* Navigation Links */}
              <nav className="space-y-4">
                <a
                  href="/profile"
                  className="flex items-center text-white hover:text-orange-500 transition duration-200"
                >
                  <User className="mr-2" size={20} />
                  Profile
                </a>

                <a
                  href="/pomodo"
                  className="flex items-center text-white hover:text-orange-500 transition duration-200"
                >
                  <Timer className="mr-2" size={20} />
                  Pomodoro Tracker
                </a>
                <a
                  href="/rewards"
                  className="flex items-center text-white hover:text-orange-500 transition duration-200"
                >
                  
                  Rewards Store
                </a>

                <a
                  href="/summariser"
                  className="flex items-center text-white hover:text-orange-500 transition duration-200"
                >
                  
                  Ai Summariser
                </a>

                {user ? (
                  <>
                    <a
                      href="#"
                      className="flex items-center text-white hover:text-orange-500 transition duration-200"
                      onClick={() => {
                        localStorage.removeItem("email");
                        router.push("/login");
                      }}
                    >
                      <LogOut className="mr-2" size={20} />
                      Logout
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="flex items-center text-white hover:text-orange-500 transition duration-200"
                    >
                      <LogIn className="mr-2" size={20} />
                      Login
                    </a>

                    <a
                      href="/register"
                      className="flex items-center text-white hover:text-orange-500 transition duration-200"
                    >
                      <Settings className="mr-2" size={20} />
                      Register
                    </a>
                  </>
                )}
              </nav>
            </div>
          </div>

        
        </div>
      </aside>
    </>
  );
}
