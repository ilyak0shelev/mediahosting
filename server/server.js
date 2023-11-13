const express = require('express');
const app = express(); 
const authRouter = require('./authRouter')
const port = process.env.PORT || 5000; 

app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        app.listen(port, () => console.log(`Listening on port ${port}`));
    } catch (error) {
        console.log(error)
    }
}

start()

