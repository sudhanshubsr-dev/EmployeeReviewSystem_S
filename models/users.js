const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        default : 'None'
    },
    password : {
        type : String,
        required : true
    },
    passcode : {
        type : String,
        default : 'None'
    },
    address : {
        type : String,
        default : 'None'
    },
    bloodGroup : {
        type : String,
        default : 'None'
    },
    designation : {
        type : String,
        default : 'None'
    },
    department : {
        type : String,
        default : 'None'
    },
}, {
    timestamps : true
});

const User = new mongoose.model('User', userSchema);

module.exports = User;