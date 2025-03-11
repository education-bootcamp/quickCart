const mongoose = require('mongoose');
const RoleSchema =
    new mongoose.Schema({
        role: {
            type:String,
            required:true,
            unique:true
        },
        description: {
            type:String,
            required:true
        }
    });
module.exports = mongoose.model('role',RoleSchema);