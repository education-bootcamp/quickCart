const mongoose = require('mongoose');
const VoucherSchema =
    new mongoose.Schema({
        displayName: {
            type:String,
            required:true,
            unique:true
        },
        description: {
            type:String
        },
        type: {
            type:String,
            required:true
        }
    });
module.exports = mongoose.model('voucher',VoucherSchema);