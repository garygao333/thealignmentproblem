import mongoose from 'mongoose'
const Schema = mongoose.Schema

const resultSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    gameMode: {
        type: String,
        required: true,
        enum: ['rapid', 'survival']
    },
    sessionId: {
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Result', resultSchema)