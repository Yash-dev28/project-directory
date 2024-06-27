const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobileNo: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10-digit mobile number!'
        },
        required: true
    },
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: '{VALUE} is not a valid email address!'
        },
        required: true,
        unique: true
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true }
    },
    loginId: {
        type: String,
        minlength: 8,
        maxlength: 8,
        required: true
    },
    password: {
        type: String,
        validate: {
            validator: function(v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(v);
            },
            message: 'Password must have 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character, with a minimum length of 6.'
        },
        required: true
    },
    creationTime: {
        type: Date,
        default: Date.now
    },
    lastUpdateTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
