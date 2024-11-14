const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    postID: {
        type: String,
        required: true
    },
    commentID: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    birthtime: {
        type: Date,
        required: true
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment