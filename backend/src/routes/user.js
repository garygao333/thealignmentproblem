import express from 'express'
import mongoose from 'mongoose'
import userModel from '../models/userModel.js'
import { loginUser, signupUser, getProfile } from '../controllers/userController.js'
import userSchema from '../models/userModel.js'

const router = express.Router()

router.post('/login', loginUser)
router.post('/signup', signupUser)
router.get('/profile', getProfile)

export default router