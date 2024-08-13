import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import User from "../models/User.js";
dotenv.config();
const {SECRET_CODE} = process.env;

export const checkPermission = async (req, res , next ) => {
    try {
        // Kiem tra nguoi dung danh nhap hay chua 
        const token = req.headers.authorization.split(" ")[1];
        // b2 : kiem tra token 
        if(!token) {
            return res.status(403).json({
                message : "Ban chua dang nhap",
            })
        }   
        // b3 : Kiem tra quyen cua nguoi dung 
        const decoded = jwt.verify(token, SECRET_CODE);
        const user = await User.findById(decoded._id);
        if(!user) {
            return res.status(403).json({
                message : "Token loi ",
            })
        }
        if(user.role !== "admin") {
            return res.status(403).json ({
                message : "Ban khong co quyen thuc hien tac vu nay",
            })
        }     
        // b4 next
        next();
    } catch (error) {
        return res.json({ 
            message: error.name , 
            message: error.message,
        })
    }
}