const { User} = require('../models/user.model');
const {ChildAccount}= require('../models/child.model')
const bcrypt= require('bcrypt');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

module.exports.login= async(req, res) => {
    const childAccount = await ChildAccount.findOne({ username: req.body.username});

    if(childAccount === null) {
        // username not found in child account collection
        return res.sendStatus(400);
    }

    // if we made it this far, we found a user with this username
    // let's compare the supplied password to the hashed password in the database
    // const correctPassword = await bcrypt.compare(req.body.password, childAccount.password);

    if(req.body.password!==childAccount.password) {
        // password wasn't a match!
        return res.sendStatus(400);
    }

    // if we made it this far, the password was correct
    const accessToken = jwt.sign({
        childId: childAccount._id
    }, process.env.SECOND_SECRET_KEY, {expiresIn : "1d"});

    console.log(accessToken)
    await ChildAccount.findByIdAndUpdate(childAccount._id, {accessToken:accessToken })
    res.status(200)
    
    .json({
        
    data: { username: childAccount.username, role: 'child', userid: childAccount._id },
    accessToken
    })}

module.exports.logout= (req, res) => {
    res.clearCookie('usertoken', {
        httpOnly: true
    });
    res.sendStatus(200);
}

module.exports.register= async (req, res) => {
    console.log(req.body);
    const{childName, childUsername, childPassword, childConfPassword, parent}= req.body
    const childAccount = await ChildAccount.findOne({ username: req.body.username});

    if(childAccount) {
        // username found and can't be duplicated
        return res.sendStatus(400);
    }
    

    ChildAccount.create({name: childName, username: childUsername, password: childPassword, parentAccount:parent})
        .then(childAccount => {
            res.json(childAccount);
        })
        .catch(err => res.status(404).json(err));
    }

module.exports.getOne=(req, res)=>{
    ChildAccount.find({_id:req.params.id})
    .then(childAccount=> res.json(childAccount))
    .catch(err=>res.status(400).json(err))
}



module.exports.getAllWithParent=(req, res)=>{
    ChildAccount.find({parentAccount: req.params.id}).sort({rewardPoints:-1, _id:1})
    .then(users=> res.json(users))
    .catch(err=>res.json(err))
}

module.exports.addPoints = (req, res) => {
    ChildAccount.findOne({_id: req.params.id})
        .then(childAccount => {
        const pointsUpdate = { rewardPoints: childAccount.rewardPoints + req.body.rewardPoints };
        ChildAccount.findOneAndUpdate({ _id: req.params.id }, pointsUpdate, { new: true })
            .then(users => res.json(users))
            .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
};

module.exports.addOnePoint=(req, res)=>{
    ChildAccount.findOne({_id: req.params.id})
    .then(childAccount=>{
        const pointsUpdate = { rewardPoints: childAccount.rewardPoints + 1 };
        ChildAccount.findOneAndUpdate({_id:req.params.id}, pointsUpdate, {new:true})
    
    .then(childAccount=>res.json(childAccount))
    .catch(err=>res.json(err))
})
    .catch(err=>res.json(err))
}

module.exports.subtractPoints = (req, res) => {
    ChildAccount.findOne({_id: req.params.id})
        .then(childAccount => {
        const pointsUpdate = { rewardPoints: childAccount.rewardPoints - req.body.cost };
        ChildAccount.findOneAndUpdate({ _id: req.params.id }, pointsUpdate, { new: true })
            .then(users => res.json(users))
            .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
};


//methods for roles

const { roles } = require('../roles')

exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
    try {
    const permission = roles.can(req.user.role)[action](resource);
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

exports.allowIfLoggedin = async (req, res, next) => {
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