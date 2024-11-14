const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    tags: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: false
    },
    birthtime: {
        type: Date,
        required: true
    },
    hidden: {
        type: Boolean,
        required: true
    },
})

const File = mongoose.model('File', fileSchema)

module.exports = File