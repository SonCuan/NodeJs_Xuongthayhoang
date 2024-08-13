import Category from "../models/Category.js"
import { categoryValidator } from "../validation/category.js"

export const getAll = async (req , res ) => { 
    try {
        const data = await Category.find({})
        if(!data || data.length ===0) { 
            return res.status(404).json({
                message: "Khong tim thay danh muc"
            })
        }
        return res.status(200).json({
            message : "Tim thay danh muc thanh cong",
            data : data 
        })
    } catch (error) {
        return res.status(500).json({
            name : error.name,
            message : error.message
        })
    }
}

export const getDetail = async (req , res ) => { 
    try {
        const data = await Category.findById(req.params.id).populate("products");
        if(!data) { 
            return res.status(404).json({
                message: "Khong tim thay danh muc"
            })
        }
        return res.status(200).json({
            message : "Tim thay danh muc thanh cong",
            data : data 
        })
    } catch (error) {
        return res.status(500).json({
            name : error.name,
            message : error.message
        })
    }
}

export const create = async (req , res ) => { 
    try {
        const {error} = categoryValidator.validate(req.body , {abortEarly : false })
        if(error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                message : errors
            })
        }
        const data = await Category.create(req.body)
        if(!data) { 
            return res.status(404).json({
                message: "Khong them duoc danh muc"
            })
        }
        return res.status(200).json({
            message : "Them danh muc thanh cong",
            data : data 
        })
    } catch (error) {
        return res.status(500).json({
            name : error.name,
            message : error.message
        })
    }
}

export const update = async (req , res ) => { 
    try {
        const {error} = categoryValidator.validate(req.body , {abortEarly : false })
        if(error) {
            const errors = error.details.map(err => err.message)
            return res.status(400).json({
                message : errors
            })
        }
        const data = await Category.findById(req.params.id , req.body, {new : true})
        if(!data) { 
            return res.status(404).json({
                message: "Khong cap nhat duoc danh muc"
            })
        }
        return res.status(200).json({
            message : "Cap nhat danh muc thanh cong",
            data : data 
        })
    } catch (error) {
        return res.status(500).json({
            name : error.name,
            message : error.message
        })
    }
}

export const remove = async (req , res ) =>  {
    try {
        const data = await Category.findByIdAndDelete(req.params.id)
        if(!data) {
            return res.status(400).json({
                message : "Khong xoa duoc danh muc"
            })
        }
        return res.status(200).json({
            message : "Xoa danh muc thanh cong",
            data : data
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            name : error.name
        })
    }
}