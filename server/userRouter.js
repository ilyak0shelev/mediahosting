const Router = require('express');
const router = new Router()
const User = require('./models/user')

router.post('/checkUser', (req, res) => {
    const nickname = req.body.id
    User.collection.findOne({nickname})
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

module.exports = router