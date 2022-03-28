const router = require('express').Router();

router.route('/')
.post((_req, res) => {
    res.json({
        message: 'Welcome to the API And This is the version 1 of out api',
        type: 0
    })
})
.all((_res, _req, next) => {
    let err = new Error('Method not allowed');
    err.status = 405;
    next(err);
})

router.use('/upload', require('./upload'));

module.exports = router;