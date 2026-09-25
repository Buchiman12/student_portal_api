import { uploadProduct, getAllProducts, getOneProduct } from "../controller/productController.js";
import { Router } from 'express';
import { uploadSingle } from "../config/multer.js";

const productRoute = Router()
productRoute.get("/products", getAllProducts)
productRoute.get("/product/:productId", getOneProduct)
productRoute.post("/products/:studentId",uploadSingle, uploadProduct)

export {
    productRoute
}