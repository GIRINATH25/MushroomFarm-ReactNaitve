const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  products: 
    {
      mushroomName: String,
      image: String,
      quantity:Number,
      price: Number,
      txnId: String,
      schedule: String,
      Date: String,
    },
  totalPrice: Number,
  productEmail: String,
  Delivery: String, 
  shippingAddress: {
    name: String,
    mobileNo: String,
    houseNo: String,
    street: String,
    landmark: String,
    city: String,
    pincode: String,
  },
  paymentMethod: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Order = mongoose.model("Order",orderSchema);

module.exports = Order;