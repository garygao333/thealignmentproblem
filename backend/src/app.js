import express from "express";
import cors from "cors";
import morgan from "morgan";
const api = express.Router();
import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import * as middleware from "./utils/middleware.js";
import user from "./routes/user.js";
import question from "./routes/question.js";
import results from "./routes/results.js";
import game from "./routes/game.js";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(cors());

//===================================================================================================================================================================
// request logger middleware
app.use(morgan("tiny"));

// healthcheck endpoint
app.get("/", (req, res) => {
  res.status(200).send({ status: "ok" });
});

app.post("/api/get-response", async (req, res) => {
  console.log("Received request at /api/get-response");
  const { content } = req.body;
  console.log("Content received from frontend:", content);

  if (!process.env.TUNE_API_KEY) {
    console.error("TUNE_API_KEY is not set in the environment variables");
    return res
      .status(500)
      .json({ success: false, message: "Server configuration error" });
  }

  try {
    const response = await axios.post(
      "https://proxy.tune.app/chat/completions",
      {
        temperature: 0.9,
        messages: [
          {
            role: "system",
            content,
          },
        ],
        model: "colinor1/colinor1-gpt-4o-mini",
        stream: false,
        frequency_penalty: 0.2,
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.TUNE_API_KEY}`,
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    console.log("Full Response Data:", response.data);
    res.json({ success: true, response: aiResponse });
  } catch (error) {
    console.error(
      "Error occurred while fetching AI response:",
      error.response ? error.response.data : error.message
    );
    res.status(error.response ? error.response.status : 500).json({
      success: false,
      message: "Failed to get AI response",
      error: error.response ? error.response.data : error.message,
    });
  }
});

app.use("/api/user", user);
app.use("/api/question", question);
app.use("/api/game", game);
app.use("/api/results", results);

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to database and listening on port, ", 3003);
    });
  })
  .catch((error) => {
    console.log(error, "Username error maybe?");
  });

// custom middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
