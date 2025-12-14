"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";
export default function Home() {
  const isMobile = useIsMobile();
  if(!isMobile){
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center px-6">
      
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-4"
      >
        Welcome to <span className="text-blue-500">Taskflow</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg text-gray-300 max-w-xl text-center mb-10"
      >
        Your personal productivity companion — Create tasks, manage your day, and stay focused.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex gap-4"
      >
        <Link href="/login">
          <Button className="px-6 py-2 rounded-xl text-lg">Login</Button>
        </Link>

        <Link href="/signup">
          <Button className="px-6 py-2 rounded-xl text-lg bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
        </Link>
      </motion.div>
    </div>
  );
  }else{
    return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center px-4 sm:px-6 text-center">
      
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 pb-[15px]"
      >
        Welcome to <span className="text-blue-500">Taskflow</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl mb-10"
      >
        Your personal productivity companion — Create tasks, manage your day, and stay focused.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
      >
        <Link href="/login" className="w-full sm:w-auto">
          <Button className="w-full px-6 py-3 rounded-xl text-base sm:text-lg">
            Login
          </Button>
        </Link>

        <Link href="/signup" className="w-full sm:w-auto">
          <Button className="w-full px-6 py-3 rounded-xl text-base sm:text-lg bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
        </Link>
      </motion.div>
    </div>
  );
  }
}
