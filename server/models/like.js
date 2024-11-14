const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likeSchema = new Schema({
    nickname: {
        type: String,
        required: true
    },
    postID: {
        type: String,
        required: true
    },
    birthtime: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
})

const Like = mongoose.model('Like', likeSchema)

module.exports = Like