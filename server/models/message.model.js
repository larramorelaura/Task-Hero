const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    comment: {
        type:String,
        required: [true, 'Message name must be entered']
    },

    parent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, 

    child:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChildAccount",
    }

}, {timestamps: true})

module.exports.Message = mongoose.model('Message', MessageSchema);