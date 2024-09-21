import Game from '../models/gameModel.js'
import Question from '../models/questionModel.js'
import mongoose from 'mongoose'

const getRapid = async (req, res) => {
    try  {
        //ig we shld decide whether we want to use a sessionid
        const sessionId = req.params.sessionId;
        //fetching 50 questions from questionmodel
        const questions = await Question.aggregate([{ $sample: { size: 50 } }]);
        res.status(200).json(questions)
    } catch (error) {
        res.status(500).json({error: 'Error fetching questions'} )
    }
}

const getSurvival = async (req, res) => {
    try  {
        //ig we shld decide whether we want to use a sessionid
        const sessionId = req.params.sessionId;
        //fetching 50 questions from questionmodel
        const questions = await Question.aggregate([{ $sample: { size: 50 } }]);
        res.status(200).json(questions)
    } catch (error) {
        res.status(500).json({error: 'Error fetching questions'} )
    }
}

export {getRapid, getSurvival}