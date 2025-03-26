import User from "../models/userModel.js";
import UserModel from "../models/userSchema.js";

// Get all users (Admin only)
export const getAllusers = async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

// Update user role
export const updateUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (user) {
            user.role = req.body.role || user.role;
            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating user" });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: "User removed" });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
};
