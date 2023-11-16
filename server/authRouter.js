const Router = require('express');
const router = new Router()
const User = require('./models/user')

router.post('/login', (req, res) => {
    // console.log(req.body.nickname)
    // console.log(req.body.pswd)

    const {nickname, pswd} = req.body
    const user = new User({nickname, pswd});
    user.collection.findOne({nickname})
    .then((result) => {
        if (result) {
            if (result.pswd !== req.body.pswd) {
                res.send('Incorrect password')
                return
            }
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
    // console.log(req.body.nickname)
    // console.log(req.body.pswd)
    // console.log(req.body.pswdRepeat)
    const {nickname, pswd} = req.body
    const user = new User({nickname, pswd});
    user.collection.findOne({nickname})
    .then((result) => {
        if (!result) {
            user.save()
            .then(() => res.send('Success'))
            .catch((error) => res.status(400).send(error))  
        } else {
            res.send('User exists')
        }
    }) 
    .catch((error) => res.status(400).send(error))
});

module.exports = router