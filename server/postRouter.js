const Router = require('express');
const router = new Router()
const fs = require('fs');
const path = require('path')
const File = require('./models/file')

router.post('/upload', (req, res) => {
    const {name, description, tags} = req.body
    const type = req.files.file.mimetype
    const owner = req.session.login
    const myFile = req.files.file

    File.collection.findOne({name})
    .then((result) => {
        if (!result) {
            myFile.mv(path.resolve(__dirname + `/storage/${req.session.login}/${name}`))
            .then(() => {
                const file = new File({name, description, tags, type, owner})
                file.save()
                .then(() => res.send('Saved'))
                .catch((error) => res.status(400).send(error))
            })
            .catch((error) => res.status(400).send(error))
        }
    })
})

module.exports = router