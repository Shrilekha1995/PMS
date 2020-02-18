var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    id: {
        type: String,
        required: "unique ID required",
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: "Email required"
    },
    loginName: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: "Password required",
        minlength: [6, "password must be atleast 6 characters long"]
    },
    role: {
        type: String,
        required: true

    },
    status: {
        type: String,
        required: true
    }

});

const user = mongoose.model('user', userSchema);
module.exports = user;
