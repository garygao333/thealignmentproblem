import Result from "../models/resultModel.js";
import User from "../models/userModel.js"; // Add this line to import the User model
import mongoose from "mongoose";

const postResults = async (req, res) => {
  const { score, gameMode, sessionId, userId } = req.body;
  try {
    if (userId) {
      const result = await Result.create({
        userId,
        score,
        gameMode,
        sessionId,
      });
      res.status(201).json(result);
    } else {
      res.status(400).json({ error: "Please input the user id." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getResults = async (req, res) => {
  const userId = req.userId;
  try {
    if (userId) {
      const results = await Result.find({ userId: userId });
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({ mssg: "No results" });
      }
    } else {
      res.status(400).json({ error: "Please input the user id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Some problem with result" });
  }
};

const getLeaderboard = async (gameMode) => {
  try {
    const results = await Result.aggregate([
      { $match: { gameMode: gameMode } },
      { $sort: { score: -1 } },
      { $limit: 50 },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          score: 1,
          gameMode: 1,
          sessionId: 1,
          userId: 1,
          username: { $ifNull: ["$user.username", "Unknown User"] },
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    return results;
  } catch (error) {
    console.error(`Error fetching ${gameMode} leaderboard:`, error);
    throw error;
  }
};

const getLeaderboardRapid = async (req, res) => {
  try {
    const results = await getLeaderboard("rapid");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Error getting rapid leaderboard scores" });
  }
};

const getLeaderboardSurvival = async (req, res) => {
  try {
    const results = await getLeaderboard("survival"); // Fixed the typo here
    res.json(results);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting survival leaderboard scores" });
  }
};

export { postResults, getResults, getLeaderboardRapid, getLeaderboardSurvival };
