const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const UserRole = mongoose.Schema({
    user_id : {
        type: ObjectId,
        ref: "User"
    },
    role_id : {
        type: ObjectId,
        ref: "Role",
    }
})

module.exports = mongoose.model('UserRole', UserRole);