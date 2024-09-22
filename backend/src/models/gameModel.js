import mongoose from 'mongoose'
const Schema = mongoose.Schema
const { Types } = mongoose;

const gameSchema = new Schema({
    sessionId: {
        type: String,
        required: true
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User'
    },
    questions: {
        type: Types.ObjectId,
        ref: 'Questions'
    },
    gameMode: {
        type: String,
        required: true,
        enum: ['rapid', 'survival'],
    }
}, {timestamps: true})

export default mongoose.model('Game', gameSchema)