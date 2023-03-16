import express from "express";

import { ProductModel } from "../Models/product.models"
import { ProductData, responseType } from "./Types";


const Router = express.Router()


Router.get("/", async (req, res)=>{
    try {
        const productList : ProductData[] = await ProductModel.find({})
        
        return res.json({status: 'ok', message:'Products Fetched' , data: productList } as responseType)
    } catch (error) {
        return res.json({status: 'ok', message:error } as responseType)
    }
})

export default Router