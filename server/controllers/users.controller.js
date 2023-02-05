const { User} = require('../models/user.model');
const bcrypt= require('bcrypt');
const jwt = require("jsonwebtoken");
const { roles } = require('../roles');

module.exports.login= async(req, res) => {
    const user = await User.findOne({ email: req.body.email});

    if(user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if(!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }

    // if we made it this far, the password was correct
    const accessToken = jwt.sign({
        userId: user._id
    }, process.env.SECRET_KEY, {expiresIn : "1d"});

    await User.findByIdAndUpdate(user._id, {accessToken: accessToken })
    res.status(200)
    // .cookie("accesstoken", accessToken)
    // .cookie("checktoken", accessToken, {
    //     secure: true,
    //     samesite:"none"
    // })
    .json({
        // msg:"success!", user:user,
    data: { email: user.email, role: user.role, userid: user._id },
    accessToken
    })

    // note that the response object allows chained calls to cookie and json
    
        // .cookie("accesstoken", accessToken, {
        //     httpOnly: true
        // })
        // .cookie("checktoken", accessToken, {
        //     secure: true,
        //     samesite:"none"
        // })
        // .json({ msg: "success!", user:user });
}

module.exports.logout= (req, res) => {
    res.clearCookie('accesstoken')
    .clearCookie('checktoken');
    res.sendStatus(200);
}

module.exports.register= async (req, res) => {

    const user = await User.findOne({ email: req.body.email});

    if(user) {
        // email found and can't be duplicated
        return res.sendStatus(400);
    }

    User.create(req.body)
        .then(user => {
            const accessToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);
    
            user.accessToken= accessToken;
            user.role= "parent";

            res
                .cookie("accesstoken", accessToken)
                .cookie("checktoken", accessToken, {
                    secure: true,
                    samesite:"none"
                })
                .json({ msg: "success!", user: user });
        })
        .catch(err => res.status(404).json(err));
    }

module.exports.getOne=(req, res)=>{
    User.find({_id:req.params.id})
    .then(user=> res.json(user))
    .catch(err=>res.status(400).json(err))
}

module.exports.getAll=(req, res)=>{
    User.find().sort({name:1, _id:1})
    .then(users=> res.json(users))
    .catch(err=>console.log(err))
}


//methods for roles



module.exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
    try {
        console.log(req.user)
    const permission = roles.can(req.user.role)[action](resource);
    console.log(roles.can([req.user.role])[action](resource))
    console.log(permission)
    if (!permission.granted) {
        return res.status(401).json({
        error: "You don't have enough permission to perform this action"
        });
    }
    next()
    } catch (error) {
    next(error)
    }
    }
}

module.exports.allowIfLoggedin = async (req, res, next) => {
    console.log(res.locals.loggedInUser)
    try {
    const user = res.locals.loggedInUser;
    if (!user)
    return res.status(401).json({
        error: "You need to be logged in to access this route"
    });
    req.user = user;
    next();
    } catch (error) {
    next(error);
    }
}