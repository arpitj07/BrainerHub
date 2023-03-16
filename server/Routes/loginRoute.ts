import express from "express";
import { Model } from "../Models/user.models"
import jwt from 'jsonwebtoken';

import { responseType } from "./Types";

const Router = express.Router()



Router.post("/", async (req,res)=>{
    
    try{
        const user = await Model.findOne({email: req.body.email})

        if(user){
            const token = jwt.sign({
                email: user.email,
                name: user.name
            }, 'secret123', {expiresIn: '15m'})
            res.json({status: 'ok', message: 'success', token: token} as responseType)
        }else{
            res.json({status: 'error', message: "user doesn't exist"} as responseType)
        }
    }catch(error){
        res.json({status: 'error', message: error})
    }

    
})


export default Router;