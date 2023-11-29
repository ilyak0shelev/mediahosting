const Router = require('express');
const router = new Router()
const path = require('path')
const File = require('./models/file')
const crypto = require("crypto");

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
                    res.status(400).send(error)})
        })
        .catch((error) => res.status(400).send(error))
})

module.exports = router