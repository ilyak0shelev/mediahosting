const express = require('express');
const app = express(); 
const authRouter = require('./authRouter')
const postRouter = require('./postRouter')
const userRouter = require('./userRouter')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const session = require('express-session')
const fileUpload = require('express-fileupload');

app.use(
    session({
        cookie: {
            sameSite: 'strict'
        },
        secret: 'Gz10FhNcyZ',
        saveUninitialized: true,
    })
)

app.use(express.json())
app.use(fileUpload());
app.use("/auth", authRouter)
app.use("/post", postRouter)
app.use("/user", userRouter)

const start = () => {
        mongoose.connect(`mongodb+srv://admin:cYHpzm6K3Ooi@cluster0.q13jkdo.mongodb.net/user_data?retryWrites=true&w=majority`)
        .then((res) => console.log("MongoDB connected!"))
        .catch((error) => console.log(error))
        app.listen(port, () => console.log(`Listening on port ${port}`));
    }

start()