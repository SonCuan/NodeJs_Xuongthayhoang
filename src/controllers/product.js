import Product from "../models/Product.js";
import { productValid } from "../validation/product.js";


export const getAll =  async(req, res) => {
    try {
        const products = await Product.find();
        if(products.length === 0) {
          return res.status(404).json ({
           message: 'Không tìm thấy sản phẩm' });
        }
        return res.status(200).json({
          message: 'Tìm thấy sản phẩm',
          data: products
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

};
export const getDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
          return res.status(404).json ({
           message: 'Không tìm thấy sản phẩm' });
        }
        return res.status(200).json({
          message: 'Lay san pham thanh cong ',
          data: product
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const create = async (req, res) => {
   try {
    const {error} = productValid.validate(req.body);
    if ( error ) { 
        return res.status(400).json({
            message: error.details[0].message,
        })
    }
    const product = await Product.create(req.body);
    if(!product) { 
        return res.status(400).json({
            message : "Không tạo được sản phẩm"
        }) 
    }else { 
        return res.status(200).json({
            message : "Tạo sản phẩm thành công", 
            data : product, 
        })
    }
   } catch (error) {
        return res.status(500).json({ message: error.message });
   }
};

export const update = async (req, res) => {
  try {
    const {error} = productValid.validate(req.body , {abortEarly : true     });
    if ( error ) { 
        return res.status(400).json({
            message: error.details[0].message,
        })
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body , {new : true });
    if(!product) {
        return res.status(400).json({
            message : "Không cập nhật được sản phẩm"
        })
    }else {
        return res.status(200).json({
            message : "Cập nhật sản phẩm thành công", 
            data : product, 
        })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const remove = async  (req, res) => {
    try {
        const data =  await Product.findByIdAndDelete(req.params.id);
        if (!data){ 
            return res.status(400).json({
                message : "Khong xoa  được sản phẩm"
            })
        }else { 
            return res.status(200).json({
                message : "Xoa sản phẩm thành công", 
                data : data,
            })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
