const Router = require('express');
const router = new Router()
const User = require('./models/user');
const Subscriber = require('./models/subscriber');
const path = require('path')
const fs = require('fs')

router.post('/checkUser', (req, res) => {
    const nickname = req.body.id
    User.collection.findOne({ nickname })
        .then((result) => {
            if (!result) {
                res.status(404).send('Профиль не найден!')
            }
            else {
                res.status(200).send('User exists')
            }
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

router.post('/checkSub', (req, res) => {
    const { user, subscriber } = req.body

    Subscriber.findOne({ user, subscriber })
        .then((result) => {
            if (result) {
                res.send(true)
            }
            else {
                res.send(false)
            }
        })
})

router.post('/getSubscriptions', (req, res) => {
    const { username } = req.body

    Subscriber.find({ subscriber: username })
        .then((result) => {
            if (!result.length) {
                res.status(204).send('No matches!')
            } else {
                res.status(200).send(result)
            }
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

router.post('/getSubscribers', (req, res) => {
    const { username } = req.body

    Subscriber.find({ user: username })
        .then((result) => {
            if (!result.length) {
                res.status(204).send('No matches!')
            } else {
                res.status(200).send(result)
            }
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

router.post('/subscribe', (req, res) => {
    const { user, subscriber } = req.body

    Subscriber.findOne({ user, subscriber })
        .then((result) => {
            if (!result) {
                const sub = new Subscriber({ user, subscriber })
                sub.save()
                    .then((result) => {
                        res.status(200).send('Success')
                    })
            }
            else {
                res.status(400).send('Exist')
            }
        })
})

router.post('/unsubscribe', (req, res) => {
    const { user, subscriber } = req.body

    Subscriber.deleteOne({ user, subscriber })
        .then((result) => {
            res.status(200).send('Success')
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

router.post('/setProfilePhoto', (req, res) => {
    const myFile = req.files.file
    const name = req.files.file.name
    const { username } = req.body

    const filePath = (path.resolve(__dirname + `/storage/${req.session.login}/profilePhoto/${name}`))
    const dirPath = (path.resolve(__dirname + `/storage/${req.session.login}/profilePhoto`))

    let fs = require('fs');

    if (username === req.session.login) {
        fs.readdir(dirPath, (err, files) => {
            if (err)
                console.log(err);
            else {
                const file = files[0]
                if (files[0] !== undefined) {
                    fs.unlink(`${dirPath}/${file}`, err => {
                        if (err) throw err;
                        myFile.mv(filePath)
                            .then((result) => {
                                res.status(200).send('Success')
                            })
                            .catch((error) => {
                                res.status(400).send(error)
                            })
                    })
                }
                else {
                    myFile.mv(filePath)
                        .then((result) => {
                            res.status(200).send('Success')
                        })
                        .catch((error) => {
                            res.status(400).send(error)
                        })
                }
            }
        })
    }
    else {
        res.status(400).send('No access!')
    }
})

router.post('/getProfilePhoto', (req, res) => {
    const { username } = req.body
    const dirPath = (path.resolve(__dirname + `/storage/${username}/profilePhoto`))

    fs.readdir(dirPath, (err, files) => {
        if (!files) {
            res.status(200).send('empty');
        }
        else {
            res.status(200).send(files[0])
        }
    })
})

router.post('/getUsersByMatch', (req, res) => {
    const { value } = req.body
    const regex = new RegExp('.*' + value + '.*')
    User.find({ "nickname": regex })
        .then((result) => {
            if (!result) {
                res.status(200).send('empty');
            }
            else {
                let users = []
                result.forEach((el) => {
                    users.push(el.nickname)
                })
                res.status(200).send(users)
            }
        })
        .catch((error) => {
            res.status(400).send(error)
        })
})

module.exports = router