const mongoose = require('mongoose');
const ReturnSchema =
    new mongoose.Schema({
        order: {
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
        returnProcess: { // process Date
            type:Array
        },
        requestedDate: {
            type:Date,
            required:true
        },
        completedData: {
            type:String // Refund, new Product
        }
    });
module.exports = mongoose.model('return',ReturnSchema);