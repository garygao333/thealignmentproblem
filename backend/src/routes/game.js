import express from 'express'
import mongoose from 'mongoose'
import gameModel from '../models/gameModel.js'
import {getRapid, getSurvival} from '../controllers/gameController.js'

const router = express.Router()

//These are the routes thats going to fetch the quesstions for the game modes.
//Also, if we want these to be game session specific, we can add an id to it.
router.get('/rapid/:sessionId', getRapid)
router.get('/survival/:sessionId', getSurvival)

//Posting game results
// router.post('/results', postResults)

//Getting game resukts
// router.get('/results/:id', getResults)

//Leaderboard
// router.get('/leaderboard', getLeaderboard)

export default router;