const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    gameMode: {
        type: String,
        required: true,
        enum: ['rapid', 'survival'],
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard'],
    }
}, {timestamps: true})

module.exports = mongoose.model('Game', gameSchema)