const jwt = require("jsonwebtoken");


module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.accesstoken, process.env.SECRET_KEY, (err, payload) => {
        if (err) { 
        res.status(401).json({verified: false});
        } else {
        next();
        }
    });
}

module.exports.decrypt = (req, res, next) => {
    jwt.verify( req.cookies.usertoken, process.env.SECRET_KEY, (err, user) => { 
        if (err) console.log(err) // eg. invalid token, or expired token
        req.user = user
        })
}