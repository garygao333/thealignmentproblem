"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Shield, Bot } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Component() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const randomMovement = () => {
    const radius = 50;
    return {
      x: Math.random() * radius * 2 - radius,
      y: Math.random() * radius * 2 - radius,
    };
  };

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative overflow-hidden bg-[#f7ede2] text-gray-800 min-h-screen flex flex-col"
        >
          <nav className="bg-[#f7ede2] p-4 flex justify-between items-center">
            <div className="flex items-center">{/* Removed Bot icon */}</div>
            <div className="flex space-x-4">
              {/* Removed Rapid and Survival buttons */}
            </div>
          </nav>
          <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
              <motion.div variants={itemVariants}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-800 mb-4">
                  The<span className="text-yellow-600"> Alignment </span>
                  <br className="sm:hidden" />
                  Problem
                </h1>
              </motion.div>
              <motion.p
                variants={itemVariants}
                className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8"
              >
                Can you outsmart AI? Test your skills in aligning AI responses
                with human expectations.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="mb-12 space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row justify-center"
              >
                <Link href="/play/rapid" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="bg-yellow-600 text-white hover:bg-yellow-700 font-bold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full w-full sm:w-auto"
                  >
                    Play Rapid
                    <Zap className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
                <div className="relative w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="bg-green-600 text-white hover:bg-green-700 font-bold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full w-full sm:w-auto opacity-50 cursor-not-allowed"
                    disabled
                  >
                    Play Survival
                    <Shield className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center rounded-full">
                    <span className="text-gray-800 font-semibold">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0 rounded-full bg-blue-300 blur-3xl"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.4, 0.3],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-4 rounded-full bg-indigo-300 blur-2xl"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.5, 0.4],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-8 rounded-full bg-purple-300 blur-xl"
                />
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-12 sm:inset-16 rounded-full border-4 border-gray-800 opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800"
                  >
                    AI
                  </motion.span>
                </div>
                <motion.div
                  className="absolute top-1/2 left-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-yellow-600 rounded-full flex items-center justify-center"
                  animate={randomMovement()}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                >
                  <span className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                    ?
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
