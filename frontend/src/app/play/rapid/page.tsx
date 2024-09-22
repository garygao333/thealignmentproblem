"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

export default function RapidGame() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [time, setTime] = useState(60); // 1 minute in seconds
  const [problemNumber, setProblemNumber] = useState(0);
  const [problemContent, setProblemContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "Welcome to the Rapid Game! I'm here to assist you.",
    },
  ]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["rapidGameQuestions"],
    queryFn: async () => {
      const sessionId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const { data } = await axios.get(
        `http://localhost:3003/api/game/rapid/${sessionId}`
      );
      setSessionId(sessionId);
      setQuestions(data);
      console.log(data);
      return data;
    },
  });

  useEffect(() => {
    if (questions.length > 0) {
      setProblemContent(questions[currentQuestionIndex].questionDescription);
      setProblemNumber(currentQuestionIndex + 1);
    }
  }, [questions, currentQuestionIndex]);

  const { userId } = useAuth();

  const sendGameResults = async () => {
    if (!userId) {
      console.error("User not authenticated");
      toast.error("You must be logged in to submit scores.");
      return;
    }

    const payload = {
      score,
      gameMode: "rapid",
      sessionId: sessionId,
      userId: userId,
    };

    console.log("Sending game results with payload:", payload);
    console.log("User ID:", userId);

    try {
      const result = await axios.post(
        `http://localhost:3003/api/results/post`,
        payload
      );
      console.log("Game results sent successfully:", result.data);
      toast.success("Game results submitted successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        console.error("Full error object:", error);
        console.error("Request config:", error.config);
        toast.error(
          `Failed to submit game results: ${
            error.response?.data?.message || error.message
          }`
        );
      } else {
        console.error("Unknown error:", error);
        toast.error("An unknown error occurred while submitting game results.");
      }
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isGameOver) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsGameOver(true);
            setProblemContent("Time's up! Game Over.");
            sendGameResults(); // Call API when time is up
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isGameOver]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect =
      answer.toLowerCase() === currentQuestion.answer.toLowerCase();

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        toast.success("Correct! Moving to the next question.");
      } else {
        // Handle end of game
        setIsGameOver(true);
        setProblemContent("Congratulations! You've completed all questions.");
        toast.success("You win! You answered all questions correctly.");
        sendGameResults(); 
      }
    } else {
      toast.error(`Incorrect`);
    }

    setAnswer("");
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (chatMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: chatMessage },
      ]);
  
      const userMessage = chatMessage;
      setChatMessage("");  // Clear the input field
  
      try {
        // Send the user's message to the backend via Axios
        const response = await axios.post("http://localhost:3003/api/get-response", { content: userMessage });
  
        // Check if the backend responded with success
        if (response.data.success) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: "assistant",
              content: response.data.response, 
            },
          ]);
        } else {
          console.error("Backend did not return success:", response.data.message);
        }
  
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "system",
            content: "Sorry, something went wrong. Please try again.",
          },
        ]);
      }
    }
  };
  
  

  //===================================================================================================================================================================

  //================================================================================================================================================================

  const getImageUrl = (url: string) => {
    const fileId = url.split("/")[5];
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  };

  const renderGameOverContent = () => {
    const totalQuestions = questions.length;
    const gameResult = time > 0 ? "You Won!" : "Time's Up!";
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">{gameResult}</h2>
        <p className="text-xl mb-6">
          Score: {score} out of {totalQuestions} questions correct
        </p>
        <Button
          onClick={() => router.push(`/leaderboard?score=${score}&mode=rapid`)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-lg"
        >
          Check Leaderboard
        </Button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7ede2]">
        <Loader2 className="w-16 h-16 text-white animate-spin" />
        <p className="mt-4 text-xl font-semibold text-white">
          Loading questions...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7ede2]">
        <p className="text-xl font-semibold text-white">
          An error has occurred: {(error as Error).message}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8 max-w-4xl bg-[#f7ede2]">
      <div className="flex justify-between items-center text-gray-600">
        <div className="text-lg">{formatTime(time)}</div>
        <div className="text-lg">{isGameOver ? "Game Over!" : `Problem #${problemNumber}`}</div>
        <div className="text-lg">Score: {score}</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-xl mb-4 text-center">{problemContent}</div>
        {questions[currentQuestionIndex]?.questionImage && (
          <div className="mb-4 relative w-full h-[300px]">
            <Image
              src={getImageUrl(questions[currentQuestionIndex].questionImage)}
              alt="Question Image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        )}
        {!isGameOver && (
          <form onSubmit={handleSubmit} className="w-full max-w-md">
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
        )}
      </div>

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
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
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
