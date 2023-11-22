const express = require('express');
const app = express(); 
const authRouter = require('./authRouter')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')


app.use(express.json())
app.use("/auth", authRouter)

const start = () => {
        mongoose.connect(`mongodb+srv://admin:cYHpzm6K3Ooi@cluster0.q13jkdo.mongodb.net/user_data?retryWrites=true&w=majority`)
        .then((res) => console.log("MongoDB connected!"))
        .catch((error) => console.log(error))
        app.listen(port, () => console.log(`Listening on port ${port}`));
    }

start()