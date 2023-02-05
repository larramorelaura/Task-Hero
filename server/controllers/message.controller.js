const {Message}= require('../models/message.model')
const {ChildAccount}= require('../models/child.model')
const {User}= require('../models/user.model')

module.exports.createMessage = (req, res) => {
    const {comment, childid} = req.body;
    Message.create({comment:comment, child: childid, parent:req.params.id})
        .then(message => res.json(message))
        .catch(err => res.json(err));
}

module.exports.createParentMessage = (req, res) => {
    const {comment, parentId} = req.body;
    Message.create({comment:comment, parent:parentId, child:req.params.id})
        .then(message => res.json(message))
        .catch(err => res.json(err));
}



module.exports.getAllChildMessages=(req, res, next) =>{
    Message.find({child : req.params.id})
    .then(messages=>res.json(messages))
    .catch(err=>res.json(err))
}