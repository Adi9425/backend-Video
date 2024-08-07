import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


 const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST:${connectionInstance.connection.host}`);
    }catch(error){
        console.log("MongoDB connection Faild",error);
        process.exit(1)
    }
 } 


 export default connectDB;


//  const mongoose = require('mongoose');
// const mySecret = process.env['mongoUrl']
// const intialDbConnection = async () => {
//   try {
//     await mongoose.connect(mySecret, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     })
//     console.log("db connected")
    
//   }
//   catch (error) {
//     console.error(error);
//   }
// }

// module.exports = { intialDbConnection }