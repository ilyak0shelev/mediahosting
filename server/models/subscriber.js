const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subscriberSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    subscriber: {
        type: String,
        required: true
    }
})

const Subscriber = mongoose.model('Subscriber', subscriberSchema)

module.exports = Subscriber