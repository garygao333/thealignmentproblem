import express from "express";
import {
  postResults,
  getResults,
  getLeaderboardRapid,
  getLeaderboardSurvival,
} from "../controllers/resultController.js";

const router = express.Router();

router.get("/rapidleaderboard", getLeaderboardRapid);
router.get("/survivalleaderboard", getLeaderboardSurvival);
router.post("/post", postResults);
router.get("/get/:id", getResults);

export default router;
