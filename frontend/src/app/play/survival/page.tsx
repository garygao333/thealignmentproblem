"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SurvivalGame() {
  const [messageCount, setMessageCount] = useState(0);
  const [problemNumber, setProblemNumber] = useState(1);
  const [problemContent, setProblemContent] = useState(
    "What is the capital of France?"
  );
  const [answer, setAnswer] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Welcome to the Rapid Game! I'm here to assist you.",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessages([...messages, { role: "user", content: answer }]);
    setAnswer("");
    setMessageCount((prevCount) => prevCount + 1);
    // Simulate AI response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "system",
          content: "Great attempt! Let's move to the next question.",
        },
      ]);
      setProblemNumber((prevNumber) => prevNumber + 1);
      setProblemContent("What is the largest planet in our solar system?");
    }, 1000);
  };

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      setMessages([...messages, { role: "user", content: answer }]);
      setAnswer("");
      setMessageCount((prevCount) => prevCount + 1);
      // Simulate AI response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "system",
            content: "I'm here to help! What would you like to know?",
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8 max-w-4xl relative">
      <div className="absolute inset-0 backdrop-blur-md z-10 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <h2 className="text-4xl font-bold text-white mb-6">
          Game Mode Coming Soon!
        </h2>
        <Link href="/play">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg">
            Take Me Back to Play
          </Button>
        </Link>
      </div>

      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="text-4xl font-bold">Messages: {messageCount}</div>
            <div className="text-2xl font-medium">Problem #{problemNumber}</div>
            <div className="text-xl font-semibold bg-white text-green-700 px-4 py-2 rounded-full shadow-md">
              Survival Mode
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full shadow-2xl border-2 border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
          <CardTitle className="text-3xl font-bold text-purple-800">
            Problem
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-xl font-medium text-gray-700">{problemContent}</p>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="flex-grow text-lg"
              />
              <Button
                type="submit"
                variant="default"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6"
              >
                Submit
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>

      <Card className="w-full shadow-2xl border-2 border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
          <CardTitle className="text-3xl font-bold text-purple-800">
            Chat with AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] w-full">
            <div className="p-6 space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar className="w-10 h-10 border-2 border-white shadow-md">
                      <AvatarFallback
                        className={
                          message.role === "user"
                            ? "bg-purple-500 text-white"
                            : "bg-pink-500 text-white"
                        }
                      >
                        {message.role === "user" ? "U" : "AI"}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`mx-3 p-4 rounded-2xl shadow-md ${
                        message.role === "user"
                          ? "bg-purple-500 text-white"
                          : "bg-pink-100 text-gray-800"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <Separator className="bg-purple-200" />
        <CardFooter className="p-4">
          <form onSubmit={handleChat} className="w-full">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Ask the AI assistant..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="flex-grow text-lg"
              />
              <Button
                type="submit"
                variant="secondary"
                className="bg-pink-500 hover:bg-pink-600 text-white px-6"
              >
                Send
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
