import express from 'express'
import mongoose from 'mongoose'
import questionModel from '../models/questionModel.js'
import {createQuestion} from '../controllers/questionController.js'

const router = express.Router()

router.post('/questions', createQuestion)

export default router;