import Game from '../models/gameModel.js'
import Question from '../models/questionModel.js'
import mongoose from 'mongoose'

const getRapid = async (req, res) => {
    try  {
        const sessionId = req.params.sessionId;
        // const userId = req.user.id;
        const userId = req.user ? req.user.id : null;

        //fetching 50 questions from questionmodel
        console.log('fetching quest')
        const questions = await Question.aggregate([{ $sample: { size: 1 } }]);
        console.log('questions fetched')

        if (userId) {
            const newGame = new Game({
                sessionId: mongoose.Types.ObjectId(sessionId),
                userId: mongoose.Types.ObjectId(userId),
                questionIds: questions.map(question => question._id),
                gameMode: 'rapid',
            });
            await newGame.save();
            res.status(200).json({ questions, gameId: newGame._id });
        } else {
            res.status(200).json(questions);
        }

    } catch (error) {
        res.status(500).send({ error: 'Error fetching questions', details: error.message });
    }
}

const getSurvival = async (req, res) => {
    try  {
        const sessionId = req.params.sessionId;
        // const userId = req.user.id;
        const userId = req.user ? req.user.id : null;

        //fetching 50 questions from questionmodel
        console.log('fetching quest')
        const questions = await Question.aggregate([{ $sample: { size: 1 } }]);
        console.log('questions fetched')

        if (userId) {
            const newGame = new Game({
                sessionId: mongoose.Types.ObjectId(sessionId),
                userId: mongoose.Types.ObjectId(userId),
                questionIds: questions.map(question => question._id),
                gameMode: 'rapid',
            });
            await newGame.save();
            res.status(200).json({ questions, gameId: newGame._id });
        } else {
            res.status(200).json(questions);
        }

    } catch (error) {
        res.status(500).send({ error: 'Error fetching questions', details: error.message });
    }
}

export {getRapid, getSurvival}