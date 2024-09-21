import mongoose from 'mongoose'
const Schema = mongoose.Schema

const gameSchema = new Schema({
    question: {
        //add objectid
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

export default mongoose.model('Game', gameSchema)