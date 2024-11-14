const Router = require('express')
const router = new Router()
const path = require('path')
const File = require('./models/file')
const Comment = require('./models/comment')
const Like = require('./models/like')
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
    const hidden = false

    const id = crypto.randomBytes(16).toString("hex")
    if (type.match('video'))
        filePath = (path.resolve(__dirname + `/storage/${req.session.login}/videos/${name}`))
    else if (type.match('image'))
        filePath = (path.resolve(__dirname + `/storage/${req.session.login}/images/${name}`))

    const file = new File({ name, filePath, title, description, tags, type, owner, id, source, birthtime, hidden })
    file.save()
        .then(() => {
            myFile.mv(filePath)
                .then(() => {
                    res.send(file)
                })
                .catch((error) => {
                    file.deleteOne({ id });
                    res.status(400).send(error)
                })
        })
        .catch((error) => res.status(400).send(error))
})

router.post('/getFiles', (req, res) => {
    const owner = req.body.username
    const files = []
    File.find({ owner, hidden: false })
        .then((result) => {
            result.forEach(file => {
                files.splice(files.length, 0, file)
            })
            res.send(files)
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

router.post('/getHiddenFiles', (req, res) => {
    const owner = req.body.username
    const files = []
    File.find({ owner, hidden: true })
        .then((result) => {
            result.forEach(file => {
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

    File.findOne({ id })
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            res.status(404).send(error)
        })
})

router.post('/saveComment', (req, res) => {
    let { postID, nickname, value, birthtime } = req.body
    value = value.trim()
    let commentID = crypto.randomBytes(16).toString("hex")
    const comment = new Comment({ postID, commentID, nickname, value, birthtime })
    comment.save()
        .then((result) => {
            res.send(result)
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

router.post('/getComments', (req, res) => {
    const postID = req.body.postID
    const comments = []

    Comment.find({ postID })
        .then((result) => {
            result.forEach(comment => {
                comments.splice(comments.length, 0, comment)
            })
            res.send(comments)
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

router.post('/dropComment', (req, res) => {
    const commentID = req.body.commentID

    Comment.deleteOne({ commentID })
        .then((result) => {
            res.status(200).send('Success')
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

router.post('/getLikesCount', (req, res) => {
    const nickname = req.body.nickname

    Like.find({ nickname }).count()
        .then((result) => {
            res.send({ count: result })
        })
})

router.post('/likePost', (req, res) => {
    const { nickname, postID, birthtime } = req.body
    File.findOne({ id: postID })
        .then((result) => {
            const like = new Like({ nickname, postID, birthtime, type: result.type, name: result.name, owner: result.owner })
            Like.findOne({ nickname, postID })
                .then((result) => {
                    if (!result) {
                        like.save()
                            .then((result) => {
                                res.status(200).send(like)
                            })
                            .catch((error) => {
                                res.status(400).send(error)
                            })
                    } else {
                        res.status(400).send('Exist')
                    }
                })
                .catch((error) => {
                    res.status(400).send(error)
                })
        })
})

router.post('/dislikePost', (req, res) => {
    const { nickname, postID } = req.body

    Like.deleteOne({ nickname, postID })
        .then((result) => {
            res.status(200).send('Success')
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

router.post('/dropPost', (req, res) => {
    const { id, owner, type } = req.body

    if (owner === req.session.login) {
        File.findOneAndDelete({ id, owner })
            .then((result) => {
                if (result) {
                    fs.unlink(`./storage/${owner}/${type}/${result.name}`, err => {
                        if (err) throw err
                    })
                    Like.deleteMany({ postID: id })
                        .then((result) => {
                            res.status(200).send('Success')
                        })
                }
                else {
                    res.status(404).send('No matches!')
                }
            })
            .catch((error) => {
                res.status(400).send(error)
            })

    }
    else {
        res.status(400).send('error')
    }
})

router.post('/checkLike', (req, res) => {
    const { nickname, postID } = req.body
    Like.findOne({ nickname, postID })
        .then((result) => {
            if (result) {
                res.status(200).send('Match')
            }
            else {
                res.status(204).send('No matches')
            }
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

router.post('/getLikes', (req, res) => {
    let { nickname, skipQuantity, limitQuantity } = req.body
    const files = []

    if (skipQuantity < 0) {
        skipQuantity = 0
    }

    Like.find({ nickname }).skip(skipQuantity).limit(limitQuantity)
        .then((result) => {
            result.forEach((item) => {
                files.splice(files.length, 0, item)
            })
            res.status(200).send(files)
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

router.post('/togglePostVisibility', (req, res) => {
    const { id, owner, hiddenValue } = req.body

    if (owner === req.session.login) {
        File.updateOne({ id, owner }, { $set: { hidden: hiddenValue } })
            .then((result) => {
                res.status(200).send("Success")
            })
            .catch((error) => {
                res.status(400).send(error)
            })
    }
})

router.post('/editPost', (req, res) => {
    const { id, owner, title, description, tags } = req.body

    if (owner === req.session.login) {
        File.updateOne({ id, owner }, { $set: { title: title, description: description, tags: tags } })
            .then((result) => {
                res.status(200).send("Success")
            })
            .catch((error) => {
                res.status(400).send(error)
            })
    }
})

router.post('/getPostsByMatch', (req, res) => {
    const { value, skipQuantity, limitQuantity } = req.body
    const regex = new RegExp('.*' + value + '.*')

    File.find({ "title": regex, hidden: false }).skip(skipQuantity).limit(limitQuantity)
        .then((result) => {
            if (!result) {
                res.status(200).send('empty')
            }
            else {
                res.status(200).send(result)
            }
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

router.post('/getPostsBySubs', (req, res) => {
    const { subs, skipQuantity, limitQuantity } = req.body
    let users = []
    let count = 0
    subs.forEach((el) => {
        users.push(el.user)
        count++
        if (count === subs.length) {
            File.find({ owner: { $in: users }, hidden: false }).skip(skipQuantity).limit(limitQuantity)
                .then((result) => {
                    console.log(result)
                    if (!result) {
                        res.status(200).send('empty')
                    }
                    else {
                        res.status(200).send(result)
                    }
                })
                .catch((error) => {
                    res.status(400).send(error)
                })
        }
    })

})

router.post('/getFilesForMainPage', (req, res) => {
    const { skipQuantity, limitQuantity } = req.body
    File.find({ owner: { $ne: req.session.login }, hidden: false }).skip(skipQuantity).limit(limitQuantity)
        .then((result) => {
            if (!result) {
                res.status(200).send('empty')
            }
            else {
                res.status(200).send(result)
            }
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

module.exports = router