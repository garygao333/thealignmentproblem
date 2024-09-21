const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resultSchema = new Schema({
    
}, {timestamps: true})

module.exports = mongoose.model('Result', resultSchema)