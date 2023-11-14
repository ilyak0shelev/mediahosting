const Router = require('express');
const router = new Router()
const User = require('./models/user')

router.post('/login', (req, res) => {
    // console.log(req.body.nickname)
    // console.log(req.body.pswd)
    const {nickname, pswd} = req.body
    const user = new User({nickname, pswd});
    user.collection.findOne({nickname, pswd})
    .then((result) => console.log(result))
    .catch((error) => console.log(error))
});

router.post('/registration', (req, res) => {
    console.log(req.body.nickname)
    console.log(req.body.pswd)
    console.log(req.body.pswdRepeat)
});

module.exports = router