const Router = require('express');
const router = new Router()
const User = require('./models/user')
const bcrypt = require('bcryptjs')
const fs = require('fs');
const path = require('path')

router.get('/check_session', (req, res) => {
    res.send({login: req.session.login, authorized: req.session.authorized})
})

router.get('/logout', (req, res) => {
    res.clearCookie(this.cookie);
    req.session.destroy(() => {
        res.send('Success')})
})

router.post('/login', (req, res) => {
    const {nickname, pswd} = req.body
    User.collection.findOne({nickname})
    .then((result) => {
        if (result) {
            if (!bcrypt.compareSync(pswd, result.hashPswd)) {
                res.send('Incorrect password')
                return
            }
            res.cookie('nickname', nickname, { secure: true })
            req.session.login = nickname
            req.session.authorized = true
            res.send('Success')
            return
        }
        else {
            res.send('No matches')
        }
    })
    .catch((error) => res.status(400).send(error))
});

router.post('/registration', (req, res) => {
    const {nickname, pswd} = req.body
    User.collection.findOne({nickname})
    .then((result) => {
        if (!result) {
            const hashPswd = bcrypt.hashSync(pswd, 5)
            const user = new User({nickname, hashPswd})
            user.save()
            .then(() => {
                res.cookie('nickname', nickname, { secure: true })
                req.session.login = nickname
                req.session.authorized = true
                fs.mkdirSync(path.resolve(__dirname + `/storage/${nickname}`))
                fs.mkdirSync(path.resolve(__dirname + `/storage/${nickname}/images`))
                fs.mkdirSync(path.resolve(__dirname + `/storage/${nickname}/videos`))
                fs.mkdirSync(path.resolve(__dirname + `/storage/${nickname}/profilePhoto`))
                res.send('Success')
                })
            .catch((error) => res.status(400).send(error))  
        } else {
            res.send('User exists')
        }
    })
    .catch((error) => res.status(600).send(error))
});

module.exports = router