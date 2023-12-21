const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    mushroomName :{
        type: String,
        required: true,
    },
    email : {
        type: String,
        required:true,
    },
    image:{
        type: String,
        otherImage:[String]
    },
    volume :{
        type: Number,
        required: true,
    },
    price : {
        type:Number,
        required: true,
    },
    description :{
        type: String,
    },
    deliveryTime: {
        type: String, 
    },
    schedule: {
        type: String,
    },
});

const product = mongoose.model("product",productSchema);

module.exports = product;