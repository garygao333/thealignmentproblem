"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export default function PlayOptions() {
  const router = useRouter();
  const [hoveredMode, setHoveredMode] = useState<string | null>(null);

  const gameModes = [
    {
      name: "Rapid",
      description: "Race against time to solve problems quickly!",
      color: "from-purple-500 to-pink-500",
      href: "/play/rapid",
    },
    {
      name: "Survival",
      description: "How long can you last? Every message counts!",
      color: "from-green-500 to-blue-500",
      href: "/play/survival",
    },
  ];

  const cardVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-8 max-w-4xl"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 text-gray-800"
      >
        Choose Your Game Mode
      </motion.h1>
      <div className="grid md:grid-cols-2 gap-8">
        {gameModes.map((mode, index) => (
          <motion.div
            key={mode.name}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
          >
            <Card
              className="relative overflow-hidden"
              onMouseEnter={() => setHoveredMode(mode.name)}
              onMouseLeave={() => setHoveredMode(null)}
            >
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="h-full"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-75`}
                />
                <CardHeader className="relative z-10">
                  <CardTitle className="text-3xl font-bold text-white">
                    {mode.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-lg text-white mb-6">{mode.description}</p>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      onClick={() => router.push(mode.href)}
                      className="w-full bg-white text-gray-800 hover:bg-gray-100"
                    >
                      Play {mode.name}
                    </Button>
                  </motion.div>
                </CardContent>
                <AnimatePresence>
                  {hoveredMode === mode.name && (
                    <motion.div
                      className="absolute inset-0 z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {mode.name === "Rapid" ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-3 h-3 rounded-full bg-white mx-1"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{
                                scale: [0, 1, 1, 0],
                                opacity: [0, 1, 1, 0],
                                x: [0, 0, 20, 20],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut",
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1.2 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        >
                          <div className="text-6xl text-white">∞</div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
