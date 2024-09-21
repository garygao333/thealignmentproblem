"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Shield } from "lucide-react";
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
          className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIC8+PC9maWx0ZXI+PC9kZWZzPjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')]"
            />
          </div>
          <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-4">
                The<span className="text-yellow-400">Alignment</span>
                <br className="sm:hidden" />
                Problem
              </h1>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8"
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
                  className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-bold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full w-full sm:w-auto"
                >
                  Play Rapid
                  <Zap className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Link href="/play/survival" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-green-500 text-white hover:bg-green-400 font-bold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full w-full sm:w-auto"
                >
                  Play Survival
                  <Shield className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
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
                className="absolute inset-0 rounded-full bg-blue-500 blur-3xl"
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
                className="absolute inset-4 rounded-full bg-indigo-500 blur-2xl"
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
                className="absolute inset-8 rounded-full bg-purple-500 blur-xl"
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
                className="absolute inset-12 sm:inset-16 rounded-full border-4 border-white opacity-60"
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
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
                >
                  AI
                </motion.span>
              </div>
              <motion.div
                className="absolute top-1/2 left-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-yellow-400 rounded-full flex items-center justify-center"
                animate={randomMovement()}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              >
                <span className="text-blue-900 font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                  ?
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
