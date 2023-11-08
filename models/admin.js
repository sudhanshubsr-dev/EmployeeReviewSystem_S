const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
    passcode : {
        type : String,
        required : true,
        default : 'YOUAREADMIN'
    }
}, {
    timestamps : true
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
