const bcrypt = require("bcrypt");
const UserModel = require("../Models/User");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

// Validation Functions
const signupValidation = (data) => {
  const schema = Joi.object({
    First_name: Joi.string().min(3).max(100).required(),
    Last_name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

// Signup Function
const signup = async (req, res) => {
  try {
    const { error } = signupValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        success: false,
      });
    }

    const { First_name, Last_name, email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, please login.",
        success: false,
      });
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({ First_name, Last_name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "Signup Successful",
      success: true,
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// Login Function
const login = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        success: false,
      });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Authentication failed. Email or password is incorrect.",
        success: false,
      });
    }

    // Compare password
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(401).json({
        message: "Authentication failed. Email or password is incorrect.",
        success: false,
      });
    }

    // Generate token
    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Successful",
      success: true,
      token,
      email,
      name: `${user.First_name} ${user.Last_name}`,
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
