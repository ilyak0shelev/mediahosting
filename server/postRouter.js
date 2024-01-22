const Router = require('express')
const router = new Router()
const path = require('path')
const File = require('./models/file')
const crypto = require("crypto")
const fs = require('fs')
// const { exec } = require("child_process");

// function synthesizeFirstFrame (videoPath, data) {
//     const nameWithoutType = path.parse(data.name).name;
//     const name = `_${nameWithoutType}_preview.jpg`
//     const title = data.title
//     const description = data.description
//     const tags = data.tags
//     const type = 'image/jpeg'
//     const owner = data.owner
//     const source = data.name
//     const id = crypto.randomBytes(16).toString("hex");
//     const filePath = (path.resolve(__dirname + `/storage/${data.owner}/images/${name}`))
    
//     const command = `ffmpeg -i ${videoPath} -ss 00:00:01 -vframes 1 ${filePath}`;
//     exec(command, (error, _, stderr) => {
//         if (error) {
//           console.log(`Error: ${error.message}`);
//         }
//         if (stderr) {
//           console.log(`ffmpeg stderr: ${stderr}`);
//         }
//         const file = new File({name, filePath, title, description, tags, type, owner, id, source })
//         file.save()
//       });

// }

router.post('/upload', (req, res) => {
    let { title, description, tags, birthtime } = req.body
    title = title.trim()
    const name = req.files.file.name
    const type = req.files.file.mimetype
    const owner = req.session.login
    const myFile = req.files.file
    const source = null
    let filePath = null

    const id = crypto.randomBytes(16).toString("hex");
    if (type.match('video'))
        filePath = (path.resolve(__dirname + `/storage/${req.session.login}/videos/${name}`))
    else if (type.match('image'))
        filePath = (path.resolve(__dirname + `/storage/${req.session.login}/images/${name}`))

    const file = new File({name, filePath, title, description, tags, type, owner, id, source, birthtime })
    file.save()
        .then(() => {
            myFile.mv(filePath)
                .then(() => {
                    // if (type.match('video'))
                    //     synthesizeFirstFrame(filePath, {title, description, tags, owner, name})
                    res.send(file)
                })
                .catch((error) => {
                    file.deleteOne({id}); 
                    res.status(400).send(error)
                })
        })
        .catch((error) => res.status(400).send(error))
})

router.post('/getFiles', (req, res) => {
    const owner = req.body.username
    const files = []
    File.find({owner})
    .then((result) => {
        result.forEach(file => {
            // files.push(file)
            files.splice(files.length, 0, file)
        })
        res.send(files)
    })
    .catch((error) => {
        res.status(400).send(error)
    })
})

router.post('/getFileById', (req, res) => {
    const id = req.body.id

    File.findOne({id})
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.status(404).send(error)
    })
})

module.exports = router