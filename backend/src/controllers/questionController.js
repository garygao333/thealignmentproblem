import Question from '../models/questionModel.js'
import mongoose from 'mongoose'

const createQuestion = async (req, res) => {
    const { questionDescription, answer, questionId } = req.body;

    try {
        const newQuestion = new Question({
            questionDescription,
            answer,
            questionId
        })
        await newQuestion.save()
        res.status(201).json(newQuestion)
    } catch (error) {
        res.status(500).json({error: "error creating question"})
    }
}

//Could also add patch and delete questions in the future. 

export {createQuestion}