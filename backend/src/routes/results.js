import express from 'express'
import mongoose from 'mongoose'
import resultModel from '../models/resultModel.js'
import { postResults, getResults, getLeaderboard }  from '../controllers/resultController.js'

const router = express.Router()

router.post('/results/:sessionId', postResults)
router.get('/results/:id', getResults)
router.get('/results/leaderboard', getLeaderboard)

export default router;

// module.exports = router

