const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// defining contraints against the taken from the user
const UserSchema =  new Schema ({
    First_name: {
        type: String,
        required: true,
    },
    Last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports= UserModel;