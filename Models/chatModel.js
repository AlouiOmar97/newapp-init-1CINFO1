const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Chat = new Schema({
    content: String,
    creationDate: Date
})

module.exports  = mongoose.model('chats', Chat)