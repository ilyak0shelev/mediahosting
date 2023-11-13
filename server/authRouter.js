const Router = require('express');
const router = new Router()

router.post('/login', (req, res) => {
    console.log(req.body.nickname)
    console.log(req.body.pswd)
});

router.post('/registration', (req, res) => {
    console.log(req.body.nickname)
    console.log(req.body.pswd)
    console.log(req.body.pswdRepeat)
});

module.exports = router