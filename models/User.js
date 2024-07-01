// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    mobileNo: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10-digit mobile number!'
        }
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: '{VALUE} is not a valid email address!'
        }
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String
    },
    loginId: {
        type: String,
        minlength: 8,
        maxlength: 8
    },
    password: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(v);
            },
            message: 'Password must have 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character, with a minimum length of 6.'
        }
    },
    creationTime: {
        type: Date,
        default: Date.now
    },
    lastUpdateTime: {
        type: Date,
        default: Date.now
    },
    isLive: {
        type: Boolean,
        default: false
    },
    socketId: String // Add socket ID field
});


module.exports = mongoose.model('User', UserSchema);
