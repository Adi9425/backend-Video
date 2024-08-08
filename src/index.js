// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import {app} from './app.js'

dotenv.config({
    path:'./.env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port :${process.env.PORT}`);;
    })
})
.catch((err)=>{
    console.log("Mongo DB connection Failed !!! ",err);
})
// app.get('/',(req,res)=>{
//     res.send("home");
// })
















// import express from "express";
// const app = express();

// (async()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on("error",()=>{
//             console.log("ERROR: ",error);
//             throw error
//         })
        
//         app.listen(process.env.PORT,()=>{
//             console.log(`Connected to port: ${process.env.PORT}`);
//         })
//     }
//     catch(error){
//         console.log("ERROR: ",error);
//         throw error
//     }
// })()