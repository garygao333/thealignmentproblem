import express from 'express'
import { postResults, getResults, getLeaderboard }  from '../controllers/resultController.js'

const router = express.Router()

router.get('/leaderboard', getLeaderboard)
router.post('/post/:sessionId', postResults)
router.get('/get/:id', getResults)

export default router;

