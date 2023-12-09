const Router = require('express')
const router = new Router()
const path = require('path')
const File = require('./models/file')
const crypto = require("crypto")
const fs = require('fs')

router.post('/upload', (req, res) => {
    const { name, description, tags } = req.body
    const type = req.files.file.mimetype
    const owner = req.session.login
    const myFile = req.files.file
    const id = crypto.randomBytes(16).toString("hex");

    const file = new File({ name, description, tags, type, owner, id })
    file.save()
        .then(() => {
            myFile.mv(path.resolve(__dirname + `/storage/${req.session.login}/${id}`))
                .then(() => res.send('Saved'))
                .catch((error) => {
                    file.deleteOne({id}); 
                    res.status(400).send(error)
                })
        })
        .catch((error) => res.status(400).send(error))
})

router.post('/getFiles', (req, res) => {
    const owner = req.body.login
    const files = new Map([])

    File.find({owner})
    .then((result) => {
        for (let i = 0; i < result.length; i++) {
            const data = fs.readFileSync(path.resolve(__dirname + `/storage/${owner}/${result[i].id}`))
            files.set(result[i].id, {info: result[i], file: data})
        }
    })
})

module.exports = router