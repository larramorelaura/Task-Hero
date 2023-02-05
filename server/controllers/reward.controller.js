const {Reward}= require('../models/reward.model')
const {ChildAccount}= require('../models/child.model')

module.exports.createReward = (req, res) => {
    const {name, cost} = req.body;
    
    Reward.create({name:name, cost:cost, parent:req.params.parentId})
        .then(reward => res.json(reward))
        .catch(err => res.json(err));
}

module.exports.getOne=(req, res)=>{
    Reward.find({_id:req.params.id})
    .then(reward=> res.json(reward))
    .catch(err=>res.status(400).json(err))
}

module.exports.updateRewardStatus=(req, res)=>{
    Reward.findOneAndUpdate({_id: req.params.id}, {redeemer:req.body.value}, {new:true})
    .then(rewards=> res.json(rewards))
    .catch(err=>console.log(err))
}

// module.exports.getAll=(req, res)=>{
//     Reward.find({parent: req.params.id}).sort({name:1, _id:1})
//     .then(rewards=> res.json(rewards))
//     .catch(err=>console.log(err))
// }

module.exports.getAll= async (req, res, next) =>{
    const child = await ChildAccount.findOne({_id: req.params.id}).populate("parentAccount")
    console.log(child)
    if(child){
    Reward.find({parent: child.parentAccount._id}).sort({name:1, _id:1}).then(rewards=> res.json(rewards))
    .catch(err=>console.log(err))}
    else{
    Reward.find({parent:req.params.id}).sort({redeemer:-1}).then(rewards=> res.json(rewards))
    .catch(err=>console.log(err))}
    
}