import { productModel } from "../model/productModel.js";
import { studentModel } from "../model/studentModel.js";
import cloudinary from "../config/cloudinary.js"

const uploadProduct = async ( req, res) =>{
    try{
         const id = await studentModel.findById(req.params.studentId)
         const { name, description, price, category, stock, quantity, image} = req.body
         if(!id){
            return res.status(404).json({
                message: "user not found"
            })
         }
         if(!req.file) {
            return res.status(400).json({
                message: "image is required"
            })
         }
         const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
         const result = await cloudinary.uploader.upload(dataUri, {
         folder: 'student_portal/products',
         resource_type: 'image'
        });
                const product = await productModel.create({
            name, description, price, category, stock, quantity, image: result.secure_url
         })
         await  id.products.push(product._id)
         await id.save()
         res.status(201).json({
            message: `Product successfully uploaded with id: ${product._id}, ${product}`,
            imageUrl: result.secure_url
         })
    }catch(error){
        res.status(500).json({
            message: `internal server error ${error.message}`
        })
    }
}

const getOneProduct = async (req, res) =>{
    try{
        const { productId } = req.params
        const product = await productModel.findById(productId)
        if (!product){
            return res.status(404).json({
                message: "the product category is empty"
            })
        }
        res.status(200).json({
            message: "product successfully fetched",
            Data : product
        })


    }catch(error){
        res.status(500).json({
            message: `internal server errror ${error.message}`
        })
    }
}

const getAllProducts = async (req, res) => {
    try{
        const products = await productModel.find()
        if(!products){
           return res.status(404).json({
                message: "the products category is  empty"
            })
        }
        res.status(200).json({
            message: "all products successfully fetched",
            Data: products
        })

    }catch(error){
       res.status(500).json({
        message: error.message})
    }
}

export { 
    uploadProduct,
    getOneProduct,
    getAllProducts
}