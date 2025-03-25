
import UserModel from "../models/userSchema.js"
import bcrypt from "bcrypt"
export const getAllusers= async(req,res,send)=>{
    try {
            const users=await UserModel.find()
            res.send({success:true, data:users})

    } catch (err) {
        res.send({success:false, message:err.message})

    }

}

export const getUsersById=async(req,res,send)=>{


    try {
            const user=await UserModel.findById(req.params.id)

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            res.send({success:true, data:user})

    } catch (err) {
        res.send({success:false, message:err.message})

    }

}

export const addNewUser = async (req, res) => {
    try {

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    
    req.body.password = hashedPassword;

        const user = await UserModel.create(req.body);

        res.status(201).json({ success: true, data: user });

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ success: false, message: err.message });
    }
};
