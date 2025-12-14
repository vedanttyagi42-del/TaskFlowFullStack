"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useIsMobile from "@/hooks/useIsMobile";
import { Home, FileText, Power } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isRight = false;

  // Fetch user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser({
          username: data.username,
          email: data.email,
          display_name: data.display_name,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchCurrentUser();
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Tasks", href: "/tasks", icon: FileText },
  ];

  const onLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/";
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  /* =======================
     📱 MOBILE NAVBAR
  ======================== */
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-gray-800">
        <div className="flex justify-around py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center ${
                  isActive ? "text-cyan-400" : "text-white"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{item.name}</span>
              </Link>
            );
          })}

          <button
            onClick={onLogout}
            className="flex flex-col items-center text-red-500"
          >
            <Power className="w-6 h-6" />
            <span className="text-xs">Logout</span>
          </button>
        </div>
      </div>
    );
  }

  /* =======================
     🖥️ DESKTOP SIDEBAR
  ======================== */
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 z-40 pointer-events-none ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`group fixed top-0 ${
          isRight ? "right-0" : "left-0"
        } h-screen bg-black flex flex-col items-center justify-between
        transition-all duration-300 ease-in-out shadow-[2px_0_0_0_white]
        z-50 overflow-hidden
        ${hovered ? "w-[280px]" : "w-[80px]"}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Title */}
        <div className="flex flex-col items-center gap-3 mt-6">
          <h3 className="text-white text-2xl font-bold tracking-wide">
            {hovered ? "TaskFlow" : "TF"}
          </h3>
        </div>

        {/* Nav Items */}
        <div className="flex flex-col items-center gap-6 w-full px-4 mt-10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-white
                  transition-all duration-200 text-lg
                  ${isActive ? "bg-[#18181b]" : "bg-transparent"}
                  hover:bg-[#18181b]`}
              >
                <Icon className="w-6 h-6 shrink-0" />

                {hovered && (
                  <span className="text-base font-medium">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="text-white mb-8 text-lg flex items-center gap-3"
        >
          <Power className="w-6 h-6" />
          {hovered && "Logout"}
        </button>
      </div>
    </>
  );
};

export default Navbar;
