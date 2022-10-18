const mongoose = require('mongoose');

var emailDB = new mongoose.Schema({
    emailFrom:{
        type: String,
        required: true,
        trim: true
    },
    emailTo:{
        type: String,
        required: true,
        trim: true
    },
    subject:{
        type: String,
        required: true,
    },
    text:{
        type: String,
        required: true,
    },
    sendDateEmail:{
        type: Date,
        default: Date.now
    },
    statusEmail:{
        type: String,
        default: "SEND"
    }
})

const EmailDB = mongoose.model('email', emailDB);
module.exports = EmailDB;