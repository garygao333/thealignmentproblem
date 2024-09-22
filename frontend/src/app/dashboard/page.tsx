"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useAuth, useUser } from "@clerk/nextjs";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const userMockData = {
  email: "player@example.com",
  firstName: "John",
  lastName: "Doe",
  rapidGameScore: 1250,
  survivalScore: 780,
  pastScores: [
    { id: 1, date: "2023-05-01", game: "Rapid", score: 1200 },
    { id: 2, date: "2023-05-02", game: "Survival", score: 750 },
    { id: 3, date: "2023-05-03", game: "Rapid", score: 1250 },
    { id: 4, date: "2023-05-04", game: "Survival", score: 780 },
    { id: 5, date: "2023-05-05", game: "Rapid", score: 1180 },
  ],
};

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.imageUrl} alt={user?.username || ""} />
            <AvatarFallback>{user?.username}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.username}!
            </h1>
            <p className="text-gray-600">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </header>

        {/* Coming Soon Alert */}
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Coming Soon</AlertTitle>
          <AlertDescription>
            We're working on bringing you personalized statistics. Stay tuned!
          </AlertDescription>
        </Alert>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <div className="absolute inset-0 backdrop-blur-sm z-10"></div>
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600">
              <CardTitle className="text-white">Rapid Game Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-center py-6 text-blue-600">
                {userMockData.rapidGameScore}
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600">
              <CardTitle className="text-white">Survival Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-bold text-center py-6 text-green-600">
                {userMockData.survivalScore}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Past Scores Table */}
        <div className="relative">
          <div className="absolute inset-0 backdrop-blur-sm z-10"></div>
          <Card>
            <CardHeader>
              <CardTitle>Past Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Game</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userMockData.pastScores.map((score) => (
                    <TableRow key={score.id}>
                      <TableCell>{score.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            score.game === "Rapid" ? "default" : "secondary"
                          }
                        >
                          {score.game}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {score.score}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
