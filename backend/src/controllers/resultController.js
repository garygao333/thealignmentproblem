import Result from '../models/resultModel.js'
import mongoose from 'mongoose'

const postResults = async(req, res) => {
    const {score, gameMode, sessionId} = req.body;
    try {
        const result = await Result.create({userId: mongoose.Types.ObjectId(userId), score, gameMode, sessionId })
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({error: "Erorr posting results"})
    }
}

const getResults = async (req, res) => {
    try {
        const results = await Result.find({userId: userId})
        if (results.length > 0) {
            res.status(200).json(results)
        } else {
            res.status(404).json({mssg: 'No results'})
        }
    } catch (error) {
        res.status(500).json({error: "Some problem with result"})
    }
}

const getLeaderboard = async (req, res) => {
    try {
        const results = await Result.find().sort({ score: -1 }).limit(50);
        res.json(results)
    } catch (error) {
        res.status(500).json({error: "Error getting scores"})
    }
}

export {postResults, getResults, getLeaderboard}