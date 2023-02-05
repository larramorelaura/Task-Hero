const {Chore}= require('../models/chore.model');
const {ChildAccount}= require('../models/child.model')

module.exports.createChore = (req, res) => {
    const {name, pointValue} = req.body;
    
    Chore.create({name:name, pointValue:pointValue, parent:req.params.parentId})
        .then(chore => res.json(chore))
        .catch(err => res.json(err));
}

module.exports.getOne=(req, res)=>{
    Chore.find({_id:req.params.id})
    .then(chore=> res.json(chore))
    .catch(err=>res.status(400).json(err))
}

module.exports.getAll= async (req, res, next) =>{
    const child = await ChildAccount.findOne({_id: req.params.id}).populate("parentAccount")
    console.log(child)
    if(child){
    Chore.find({parent: child.parentAccount._id}).sort({name:1, _id:1}).then(chores=> res.json(chores))
    .catch(err=>console.log(err))}
    else{
    Chore.find({parent:req.params.id}).sort({status:1}).then(chores=> res.json(chores))
    .catch(err=>console.log(err))}
    
}

module.exports.updateChoreStatus=(req, res)=>{
    Chore.findOneAndUpdate({_id: req.params.id}, {status: req.body.value}, {new:true})
    .then(chores=> res.json(chores))
    .catch(err=>console.log(err))
}

