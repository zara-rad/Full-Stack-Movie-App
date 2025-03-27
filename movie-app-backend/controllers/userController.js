import UserModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res, send) => {
  try {
    const users = await UserModel.find();
    res.send({ success: true, data: users });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
};

export const getUsersById = async (req, res, send) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.send({ success: true, data: user });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
};


export const addNewUser = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = await UserModel.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};



// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log("debugger");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Compare the provided password with the stored hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Send the token and user data
    res
    .header("token",token)
      .status(200)
      .json({ success: true, message: "Login successful", data: user, token });
      //complete the verification route for token ask Zahra
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
