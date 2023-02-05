const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const ChildAccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Child's name is required"]
    },

    username: {
        type: String,
        required: [true, "Username is required"],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },

    parentAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:[true, "User not authorized to create child account"]
    },

    role: {
        type: String,
        default: 'child',
        enum: ["child", "parent", "admin"]
    },

    rewardPoints: {
        type: Number,
        default: 0,
        required: [true]
    },

    accessToken:{
        type:String
    }


}, {timestamps: true});

    

    ChildAccountSchema.virtual('childConfPassword')
        .get( () => this._childConfPassword )
        .set( value => this._childConfPassword = value );

    ChildAccountSchema.pre('validate', function(next) {
        if (this.childPassword !== this.childConfPassword) {
            this.invalidate('childConfPassword', 'Password must match confirm password');
        }
        next();
    });

    ChildAccountSchema.pre('save', function(next) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
            this.childPassword = hash;
            
            next();
            });
    });

module.exports.ChildAccount = mongoose.model('ChildAccount', ChildAccountSchema);