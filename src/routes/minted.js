const router = require('express').Router();
const certificates = require('./../schema/certificates')

router
.route('/')
.post((req, res, next) => {
    certificates.find({email: req.body.email})
    .then((certi) => {
        res.json({
            status: 200,
            message: 'Success',
            mintedCertificates: certi
        });
    })
    .catch(() => {
        let err = new Error('Error while fetching minted certificates');
        err.status = 500;
        next(err);
    })
    
})
.all((_res, _req, next) => {
    let err = new Error('Method not allowed');
    err.status = 405;
    next(err);
});

module.exports = router;