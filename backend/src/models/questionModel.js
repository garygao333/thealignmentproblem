import mongoose from 'mongoose'
const Schema = mongoose.Schema

const questionSchema = new Schema({
    questionDescription: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Question', questionSchema)