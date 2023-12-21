const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const multer = require('multer');
const path = require('path');
const md5 = require('md5');
const User = require("./models/user");
const Order = require("./models/order");
const Product = require("./models/product");
const Complaint = require("./models/complaints");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let imgName="";

const storage = multer.diskStorage({
  destination: function (req,file,cb){
    cb(null, 'images')
  },filename:function(req,file,cb){
    cb(null,Date.now()+path.extname(file.originalname));
    imgName=Date.now()+path.extname(file.originalname);
  }
})

const upload = multer({ storage });

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((e) => console.log("error", e));


  const sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dg3138999@gmail.com",
        pass: "xthxabubdaqzieca",
      },
    });
  
  
    const mailOptions = {
      from: "mushroom",
      to: email,
      subject: "Email Verification",
      text: `Please click the following link to verify your email: http://172.16.123.251.122:8000/verify/${verificationToken}`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully");
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

app.post("/register", async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;
    const existingUser = await User.findOne({ email: Email });
    if (existingUser) {
      console.log("Email already registered:", Email);
      return res.json({ message: "Email already registered" });
    }

    const newUser = new User({ name: Name, email: Email, password: md5(Password) });
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");
    await newUser.save();
    console.log("New User Registered:", newUser);
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.json({
      message: "Registration successful.",
    });
  } catch (error) {
    console.log("Error during registration:", error);
    res.json({ message: "Registration failed" });
  }
});

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verificatioion Failed" });
  }
});


const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

let secretKey = generateSecretKey();

app.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ email: Email });
    if (!user) {
      return res.json({ message: "Invalid email or password" });
    }

    if (user.password !== md5(Password)) {
      return res.json({ message: "Invalid password" });
    }
    secretKey = generateSecretKey();

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.json({ token });
  } catch (error) {
    res.json({ message: "Login Failed" });
  }
});

app.get("/product", async (req, res) => {
  Product.find({})
    .then((r) => res.json(r))
    .catch((e) => res.json(e));
});

app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.json({ message: "User not found" });
    }

    user.addresses = address;

    await user.save();

    res.json({ message: "Address created Successfully" });
  } catch (error) {
    res.json({ message: "Error addding address" });
  }
});

app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.json({ addresses, user });
  } catch (error) {
    res.json({ message: "Error retrieveing the addresses" });
  }
});

app.post("/changePassword", async (req, res) => {
  try {
    const { userId, Oldpassword, password } = req.body;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.json({ message: "User not found" });
    }

    if (md5(Oldpassword) === user.password) {
      user.password = md5(password);

      await user.save();

      res.json({ message: "Password changed successfully" });
    }else{
      res.json({message: "wrong"});
    }
  } catch (error) {
    res.json({ message: "Error in changing password" });
  }
});

app.get("/images/:img",async (req,res)=>{
  const img=req.params.img;
  const imagePath = path.join(__dirname, 'images', img);
  res.sendFile(imagePath);
})

app.post('/complaints', upload.single('image'), async (req, res)=>{
  try {
    
    const imageBuffer = req.file.buffer;
    const { email, issueDate, issueDetails, issue } = req.body;

    console.log('Email:', email);
    console.log('Issue Date:', issueDate);
    console.log('Issue Details:', issueDetails);
    console.log('Type Of Issue:', issue);

    const newComplaint = new Complaint({
      email,
      issueDate,
    });

    newComplaint.pictureOfIssue=`http://192.168.104.248:3000/images/${imgName}`;
    newComplaint.typeOfComplaint=issue;
    newComplaint.detailsOfIssue=issueDetails;

    await newComplaint.save();

    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error handling image upload:', error);
    res.status(500).json({ message: 'Failed to upload image. Please try again.' });
  }
});


app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses,user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

app.post("/orders",async(req,res)=>{
  try{
    const {userId, addresses, product} = req.body;

    console.log(userId, addresses, product);
    const user = await User.findById(userId);
    if(!user){
      return res.json({message: "User not found"})
    }


    const order = new Order({
      user:userId,
      products:product,
      totalPrice:product.price,
      productEmail:product.email,
      Delivery:"no",
      shippingAddress:addresses,
    })

    console.log(order);

    await order.save();

    res.status(200).json({message: "Order created successfully"});
  }catch(error){
    console.log("error creating orders",error);
    res.status(500).json({message: "Error creating orders"});
  }
})

app.get('/orders/:userId',(req,res)=>{
    const userId = req.params.userId;
    Order.find({user:userId})
    .then((r) => res.json(r))
    .catch((e) => res.json(e));
})

app.get('/paymentHistory/:userId',(req,res)=>{
  const userId = req.params.userId;
  Order.find({user:userId})
  .then((r) => res.json(r))
  .catch((e) => res.json(e));
})