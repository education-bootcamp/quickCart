const mongoose = require('mongoose');
const OrderSchema =
    new mongoose.Schema({
        products: {
            type:Array, //[productData, discount, qty]
            required:true
        },
        total: {
            type:Number
        },
        status: {
            type:String, // PENDING, CANCELLED, COMPLETED
            required:true
        },
        customer: {
            type:Object, // {id,email,name}
            required:true
        },
        trackingData: {
            type:Array,
            required:true
        },
        placedDate: {
            type:Date,
            required:true
        },
        shippedDate: {
            type:Date,
            required:true
        }
    });
module.exports = mongoose.model('order',OrderSchema);