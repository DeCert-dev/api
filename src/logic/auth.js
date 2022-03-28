const business = require('./../schema/business');
require('dotenv').config();

var tempData = new Map();

module.exports = (req, _res, next) => {
    if (req.url==='/signup' || req.url==='/login' || req.url==='/minted') {
        if (req.headers.authorization!==`Bearer ${process.env.ADMIN_KEY}`) {
            let err = new Error('Unauthorized');
            err.status = 401;
            next(err);
        }
        req.user = {
            name: 'Admin'
        }
        next();
        return;
    }
    if(!req.headers.authorization){
        let err = new Error('Unauthorized');
        err.status = 401;
        next(err);
        return;
    }
    else{
        let token = req.headers.authorization.split(' ')[1];
        if(tempData.has(token)){
            req.user = tempData.get(token);
            next();
            return;
        } else {
            business.findOne({_id: token}).then(business => {
                if(business){
                    tempData.set(token, business);
                    req.user = business;
                    next();
                    return;
                } else {
                    let err = new Error('Unauthorized');
                    err.status = 401;
                    next(err);
                    return;
                }
            }).catch(() => {
                let err = new Error('Unauthorized');
                err.status = 401;
                next(err);
                return;
            })
            
        }
    }
}