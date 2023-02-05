const mongoose = require('mongoose');

const ChoreSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Chore name must be entered']
    },

    pointValue:{
        type:Number,
        required: [true, 'All chores need an assigned amount of points for rewards']
    },

    status:{
        type:String, 
        default: "available"
    },

    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:[true, "User not authorized to create rewards"]
    }

}, {timestamps: true})

module.exports.Chore = mongoose.model('Chore', ChoreSchema);