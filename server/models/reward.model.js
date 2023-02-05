const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Reward name must be entered']
    },

    cost:{
        type:Number,
        required: [true, 'All rewards need an assigned point cost']
    },

    redeemer:{
        type:String,
        default: ""
    },

    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:[true, "User not authorized to create rewards"]
    }

}, {timestamps: true})

module.exports.Reward = mongoose.model('Reward', RewardSchema);