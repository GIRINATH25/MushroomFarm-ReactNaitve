const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  addresses: 
    {
      name: {
        type: String,
        default: 'name'
      },
      mobileNo: {
        type: Number,
        default: 9123456789,
      },
      houseNo: {
        type: String,
        default: 'houseNo',
      },
      street:{
        type: String,
        default: 'Street',
      },
      landmark: {
        type: String,
        default: 'Landmark',
      },
      city: {
        type: String,
        default: 'City',
      },
      country: {
        type: String,
        default: 'Country',
      },
      pincode: {
        type: Number,
        default: 600000,
      },
    },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User",userSchema);

module.exports = User