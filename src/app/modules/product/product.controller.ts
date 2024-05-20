import { Request, Response } from "express";
import { ProductServices } from "./product.services";

const createProduct = async(req: Request, res: Response)=>{
    try {
        const {product: productData} = req.body;
        const result = await ProductServices.createProductIntoDB(productData)

        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result
        })
    } catch (error) {
        console.log(error);
    }
}

const getAllProduct = async (req: Request, res: Response) =>{
    try {
        const result = await ProductServices.getAllProductIntoDB()
        res.status(200).json({
          success: true,
          message: 'Products fetched successfully!',
          data: result,
        });

    } catch (error) {
        console.log(error);
    }
}

export const ProductControllers = {
    createProduct,
    getAllProduct,
}
