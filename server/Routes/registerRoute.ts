import express from "express";
import { Model } from "../Models/user.models"
import { responseType } from "./Types";


const Router = express.Router()


Router.post("/", async (req,res)=>{
    
    try{
        const user = await Model.findOne({ email: req.body.email });
        if(!user){
            await Model.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.userPassword
            })
            res.json({status: 'ok', message: 'User registered successfully'} as responseType)
        }else{
            res.json({status: 'error', message: 'User already exist'} as responseType)
        }
    }catch(error){
        res.json({status: 'error', message: error} as responseType)
    }

    
})


export default Router;