import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app= express();

app.use(cors({
    origin:process.env.CROS_ORIGIN,
    Credential:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.routes.js";


//routes declaration
app.post("/",(req,res)=>{
    res.send("Working");
})
app.use("/api/v1/users",userRouter)
// http://localhost:8000/api/v1/users/register
export {app}