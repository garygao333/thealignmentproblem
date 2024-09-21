const Workout = require('../models/gameModel')
const mongoose = require('mongoose')

const getRapid = async (req, res) => {
    try  {
        //ig we shld decide whether we want to use a sessionid
        const sessionId = req.params.sessionId;
        //fetching 50 questions from questionmodel
        const questions = await QuestionModel.aggregate([{ $sample: { size: 50 } }]);
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
        const questions = await QuestionModel.aggregate([{ $sample: { size: 50 } }]);
        res.status(200).json(questions)
    } catch (error) {
        res.status(500).json({error: 'Error fetching questions'} )
    }
}

const postResults = async(req, res) => {
    try {
        const { Id, sessionId } = req.body;
        

    } catch (error) {
        res.status(500).json({error: "Erorr posting"})
    }
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}