const router = require('express').Router();
const business = require('./../schema/business');

router
.route('/')
.post((req, res, next) => {
    business.findOne({email: req.body.email})
        .then((account) => {
            if(!account){
                let err = new Error("Account not found");
                err.status = 404
                next(err)
            }
            res.json(account);
        })
})
.all((_res, _req, next) => {
    let err = new Error('Method not allowed');
    err.status = 405;
    next(err);
});

module.exports = router;