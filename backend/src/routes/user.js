import routes from './helloRouter'

const express = require('express')

const { loginUser, signupUser, getProfile } = require('../controllers/userController')

const router = express.Router()

router.post('/login', loginUser)
router.post('/signup', signupUser)
router.get('/profile', getProfile)

export default routes