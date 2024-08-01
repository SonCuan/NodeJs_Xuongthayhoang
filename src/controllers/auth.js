import User from "../models/User.js";
import { signInValidator, signUpValidator } from "../validation/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const {SECRET_CODE} = process.env;
export const signUp = async (req, res) => {
    try {
        // b1 : validate data
        const {error} = signUpValidator.validate(req.body, { abortEarly: false });
        if(error){
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message : errors 
            })
        }
        // b2  : Kiem tra email da ton tai hay chua 
        const userExists = await User.findOne({email : req.body.email})
        if(userExists){
            return res.status(400).json({
                message : "Email đã tồn tại"
            })
        }
        // b3 : ma hoa password 
        const hashedPassword = await bcryptjs.hash(req.body.password , 10);
        // b4 : tao user 
        const user = await User.create({
            ...req.body,
            password : hashedPassword
        })
        user.password = undefined;
        // b5 : thong bao cho nguoi dung 
        return res.status(200).json({
            message: "Đăng ký thành công",
            user
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
         });
    }
}

export const signIn = async (req,res) => { 
    try {
        // b1 : validate data
        const {error} = signInValidator.validate(req.body , {abortEarly:false});
        if (error) { 
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message : errors 
            })
        }
        // b2  : Kiem tra email da ton tai hay chua
        const user = await User.findOne({email : req.body.email})
        if(!user){
            return res.status(404).json({
                message : "Email nay da duoc dang ky , ban co muon dang ky khong?"
            })
        }
        // b3 : tim user cho email nay
        // b4 : kiem tra password
        const isMatch = await bcryptjs.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message : "Mật khẩu không đúng!"
            })
        }
        // b5 : Tao JWT
        const accessToken = jwt.sign({_id: user._id } , SECRET_CODE)
        user.password = undefined;
        // b6 : thong bao cho nguoi dung    
        return res.status(200).json({
            message: "Đăng nhập thành công",
            user,
            accessToken
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}