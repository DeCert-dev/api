const router = require('express').Router();

router
.route('/')
.get(async (req, res) => {
    res.json({ 
        message: 'Welcome to the API',
        type: 0
    });
})
.all((_res, _req, next) => {
    let err = new Error('Method not allowed');
    err.status = 405;
    next(err);
})

router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/minted', require('./minted'));

router.use('/v1', require('./v1'));

module.exports = router;