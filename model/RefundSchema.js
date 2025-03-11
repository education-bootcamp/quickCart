const mongoose = require('mongoose');
const RefundSchema =
    new mongoose.Schema({
        order: {
            type:Object,
            required:true
        },
        returnData: {
            type:Object,
            required:true
        },
        reason: {
            type:String,
            required:true
        },
        status: {
            type:String, // PENDING, REJECTED, COMPLETED
            required:true
        },
        refundProcess: { // process Date
            type:Array
        },
        requestedDate: {
            type:Date,
            required:true
        },
        refundedAmount: {
            type:Number
        }
    });
module.exports = mongoose.model('refund',RefundSchema);