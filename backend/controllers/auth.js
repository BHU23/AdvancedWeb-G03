require("dotenv").config();
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
const bcrypt = require("bcryptjs");

const key = process.env.JWT_SECRET; 

// Function to hash password
const makeHash = async (plainText) => {
  const result = await bcrypt.hash(plainText, 10);
  return result;
};

// Function to compare password and hash
const compareHash = async (plainText, hashText) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainText, hashText, (err, data) => {
      if (err) {
        reject(new Error("Error bcrypt compare"));
      } else {
        resolve({ status: data });
      }
    });
  });
};

const findUser = async (email) => {
  return await Customer.findOne({ email });
};

exports.login = async (req, res) => {
  const payload = {
    email: req.body.email,
    password: req.body.password,
  };
console.log(payload)
  try {
    const result = await findUser(payload.email);
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(result);
    
    const loginStatus = await compareHash(payload.password, result.password);
    const status = loginStatus.status;

    console.log(status);
    
    if (status) {
      const token = jwt.sign(
        { 
    title: result.title,
    id: result._id,  
    email: result.email,
    firstName: result.firstName,
    lastName: result.lastName,
    userID: result.userID,
    gender: result.gender,
    address: result.address,
    phoneNumber: result.phoneNumber,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt
  },
  key, 
  { expiresIn: "6h" } 
);

      console.log(token);
      
      res.status(200).json({ result, token, status });
    } else {
      res.status(401).json({ status: false, message: "Invalid password" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.signup = async (req, res) => {
  try {
    const {
      password,
      email,
      title,
      firstName,
      lastName,
      gender,
      address,
      phoneNumber,
      avatar,
    } = req.body;
    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one letter and one number and @$!%*?&" });
    }

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingPhone = await Customer.findOne({ phoneNumber });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    const hashText = await makeHash(password);

    const payload = {
      password: hashText,
      email,
      title,
      firstName,
      lastName,
      gender,
      address,
      phoneNumber,
      avatar,
    };
    console.log(payload)
    const newUser = new Customer(payload);
    const result = await newUser.save();

    const userResponse = result.toObject();
    delete userResponse.password; 

    res.status(201).json({ user: userResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred during sign up" });
  }
};
