import express from "express";

import { ProductModel } from "../Models/product.models"
import { responseType } from "./Types";


const Router = express.Router()


Router.post("/", async (req, res)=>{
    try {
        await ProductModel.create({
            ProductName:req.body.Productname,
            ProductImage:req.body.ProductImage,
            ProductDesctription:req.body.Productdescription,
            ProductQuantity:Number(req.body.ProductQuantity),
            ProductPrice: Number(req.body.ProductPrice)
        })
    
        return res.json({status: 'ok', message:'Product added Successfully' } as responseType)
    } catch (error) {
        return res.json({status: 'ok', message:error } as responseType)
    }
})

export default Router