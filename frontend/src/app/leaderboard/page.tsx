"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const rapidLeaderboardData = [
  {
    rank: 1,
    name: "Alice Johnson",
    score: 2500,
    avatar: "/avatars/alice.jpg",
    level: 30,
    winStreak: 15,
  },
  {
    rank: 2,
    name: "Bob Smith",
    score: 2350,
    avatar: "/avatars/bob.jpg",
    level: 28,
    winStreak: 7,
  },
  {
    rank: 3,
    name: "Charlie Brown",
    score: 2200,
    avatar: "/avatars/charlie.jpg",
    level: 27,
    winStreak: 4,
  },
  {
    rank: 4,
    name: "Diana Prince",
    score: 2150,
    avatar: "/avatars/diana.jpg",
    level: 26,
    winStreak: 3,
  },
  {
    rank: 5,
    name: "Ethan Hunt",
    score: 2100,
    avatar: "/avatars/ethan.jpg",
    level: 25,
    winStreak: 2,
  },
  {
    rank: 6,
    name: "Fiona Gallagher",
    score: 2050,
    avatar: "/avatars/fiona.jpg",
    level: 24,
    winStreak: 1,
  },
  {
    rank: 7,
    name: "George Costanza",
    score: 2000,
    avatar: "/avatars/george.jpg",
    level: 23,
    winStreak: 0,
  },
  {
    rank: 8,
    name: "Hermione Granger",
    score: 1950,
    avatar: "/avatars/hermione.jpg",
    level: 22,
    winStreak: 2,
  },
  {
    rank: 9,
    name: "Ian Malcolm",
    score: 1900,
    avatar: "/avatars/ian.jpg",
    level: 21,
    winStreak: 1,
  },
  {
    rank: 10,
    name: "Jessica Jones",
    score: 1850,
    avatar: "/avatars/jessica.jpg",
    level: 20,
    winStreak: 3,
  },
];

const survivalLeaderboardData = [
  {
    rank: 1,
    name: "Eve Williams",
    score: 3000,
    avatar: "/avatars/eve.jpg",
    level: 35,
    survivalTime: 120,
  },
  {
    rank: 2,
    name: "Frank Miller",
    score: 2800,
    avatar: "/avatars/frank.jpg",
    level: 32,
    survivalTime: 110,
  },
  {
    rank: 3,
    name: "Grace Kelly",
    score: 2600,
    avatar: "/avatars/grace.jpg",
    level: 30,
    survivalTime: 95,
  },
  {
    rank: 4,
    name: "Henry Ford",
    score: 2400,
    avatar: "/avatars/henry.jpg",
    level: 28,
    survivalTime: 80,
  },
  {
    rank: 5,
    name: "Isabella Rossellini",
    score: 2200,
    avatar: "/avatars/isabella.jpg",
    level: 26,
    survivalTime: 70,
  },
  {
    rank: 6,
    name: "Jack Sparrow",
    score: 2000,
    avatar: "/avatars/jack.jpg",
    level: 24,
    survivalTime: 60,
  },
  {
    rank: 7,
    name: "Kate Winslet",
    score: 1800,
    avatar: "/avatars/kate.jpg",
    level: 22,
    survivalTime: 50,
  },
  {
    rank: 8,
    name: "Leonardo DiCaprio",
    score: 1600,
    avatar: "/avatars/leonardo.jpg",
    level: 20,
    survivalTime: 40,
  },
  {
    rank: 9,
    name: "Meg Ryan",
    score: 1400,
    avatar: "/avatars/meg.jpg",
    level: 18,
    survivalTime: 30,
  },
  {
    rank: 10,
    name: "Natalie Portman",
    score: 1200,
    avatar: "/avatars/natalie.jpg",
    level: 16,
    survivalTime: 20,
  },
];

type LeaderboardMode = "rapid" | "survival";

type Player = {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  level: number;
  winStreak?: number;
  survivalTime?: number;
};

export default function LeaderboardPage() {
  const [mode, setMode] = useState<LeaderboardMode>("rapid");

  useEffect(() => {
    const duration = 700; // 2 seconds
    const animationEnd = Date.now() + duration;

    const uniqueConfettiColors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#FFA07A",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#82E0AA",
    ];

    const runConfettiAnimation = () => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) return;

      // Left bottom cannon
      confetti({
        particleCount: 15,
        angle: 60,
        spread: 30,
        origin: { x: 0, y: 1 },
        colors: uniqueConfettiColors,
        zIndex: 100,
      });

      // Right bottom cannon
      confetti({
        particleCount: 15,
        angle: 120,
        spread: 30,
        origin: { x: 1, y: 1 },
        colors: uniqueConfettiColors,
        zIndex: 100,
      });

      requestAnimationFrame(runConfettiAnimation);
    };

    runConfettiAnimation();

    return () => {
      confetti.reset();
    };
  }, []);

  const renderLeaderboard = (data: Player[]) => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[60px] sm:w-[80px] font-semibold text-gray-700">
              Rank
            </TableHead>
            <TableHead className="font-semibold text-gray-700">
              Player
            </TableHead>
            <TableHead className="text-right font-semibold text-gray-700">
              Score
            </TableHead>
            <TableHead className="text-center hidden sm:table-cell font-semibold text-gray-700">
              Level
            </TableHead>
            <TableHead className="text-center hidden md:table-cell font-semibold text-gray-700">
              {mode === "rapid" ? "Win Streak" : "Survival Time"}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((player, index) => (
            <motion.tr
              key={player.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`
              hover:bg-gray-50 transition-colors duration-150 ease-in-out
              ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            `}
            >
              <TableCell className="font-medium text-center">
                {player.rank <= 3 ? (
                  <Badge
                    className={`
                    px-2 py-1 rounded-full text-sm font-bold
                    ${player.rank === 1 ? "bg-yellow-400 text-yellow-900" : ""}
                    ${player.rank === 2 ? "bg-gray-300 text-gray-800" : ""}
                    ${player.rank === 3 ? "bg-amber-600 text-amber-100" : ""}
                  `}
                  >
                    {player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : "🥉"}
                  </Badge>
                ) : (
                  <span className="text-gray-600">{player.rank}</span>
                )}
              </TableCell>
              <TableCell className="flex items-center space-x-3">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-200">
                  <AvatarImage src={player.avatar} alt={player.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                    {player.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-gray-800">{player.name}</span>
              </TableCell>
              <TableCell className="text-right font-bold text-gray-900">
                {player.score.toLocaleString()}
              </TableCell>
              <TableCell className="text-center hidden sm:table-cell">
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-600 border-blue-200"
                >
                  Lvl {player.level}
                </Badge>
              </TableCell>
              <TableCell className="text-center hidden md:table-cell">
                <Badge
                  variant="outline"
                  className={`
                  px-2 py-1 rounded-full
                  ${
                    mode === "rapid"
                      ? player.winStreak && player.winStreak > 0
                        ? "bg-green-50 text-green-600 border-green-200"
                        : "bg-red-50 text-red-600 border-red-200"
                      : "bg-purple-50 text-purple-600 border-purple-200"
                  }
                `}
                >
                  {mode === "rapid"
                    ? player.winStreak && player.winStreak > 0
                      ? `${player.winStreak} 🔥`
                      : "No streak"
                    : `${player.survivalTime} min`}
                </Badge>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">
        🏆 Leaderboard 🏆
      </h1>
      <Tabs
        defaultValue="rapid"
        className="w-full"
        onValueChange={(value) => setMode(value as LeaderboardMode)}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="rapid">Rapid</TabsTrigger>
          <TabsTrigger value="survival">Survival</TabsTrigger>
        </TabsList>
        <TabsContent value="rapid">
          {renderLeaderboard(rapidLeaderboardData)}
        </TabsContent>
        <TabsContent value="survival">
          {renderLeaderboard(survivalLeaderboardData)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
