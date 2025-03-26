import jwt from "jsonwebtoken";
import UserModel from "../models/userSchema.js";
export const auth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (token) {
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            if (!decode) throw new Error("invalid token");
            const user = await UserModel.findById(decode._id)
            req.user = user;
            next();
        } else {
            res.send({ success: false, message: "token is required!" });
        }
    } catch (err) {
        next(err);
    }
};