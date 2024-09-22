"use client";

import { useState, useEffect } from "react";
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
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

type LeaderboardEntry = {
  _id: string;
  userId: string;
  username: string;
  score: number;
  gameMode: string;
  sessionId: string;
  createdAt: string;
  updatedAt: string;
};

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const searchParams = useSearchParams();
  const score = searchParams.get("score");
  const modeParam = searchParams.get("mode");

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/api/results/rapidleaderboard"
        );
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  const renderLeaderboard = (data: LeaderboardEntry[]) => (
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data
              .sort((a, b) => b.score - a.score)
              .map((entry, index) => (
                <motion.tr
                  key={entry._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`
                  hover:bg-gray-50 transition-colors duration-150 ease-in-out
                  ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                `}
                >
                  <TableCell className="font-medium text-center">
                    {index + 1 <= 3 ? (
                      <Badge
                        className={`
                        px-2 py-1 rounded-full text-sm font-bold
                        ${
                          index + 1 === 1 ? "bg-yellow-400 text-yellow-900" : ""
                        }
                        ${index + 1 === 2 ? "bg-gray-300 text-gray-800" : ""}
                        ${index + 1 === 3 ? "bg-amber-600 text-amber-100" : ""}
                      `}
                      >
                        {index + 1 === 1 ? "🥇" : index + 1 === 2 ? "🥈" : "🥉"}
                      </Badge>
                    ) : (
                      <span className="text-gray-600">{index + 1}</span>
                    )}
                  </TableCell>
                  <TableCell className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-200">
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                        {entry.userId.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-gray-800">
                      {entry.username}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-bold text-gray-900">
                    {entry.score.toLocaleString()}
                  </TableCell>
                </motion.tr>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-4">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-800">
        🏆 Rapid Leaderboard 🏆
      </h1>
      {renderLeaderboard(leaderboardData)}
      <div className="mt-8 text-center text-gray-600">
        <p className="text-lg font-semibold">
          Survival Leaderboard Coming Soon!
        </p>
        <p className="text-sm mt-2">
          Stay tuned for our exciting new game mode.
        </p>
      </div>
    </div>
  );
}
