import mongoose,{Schema} from "mongoose";

const subsciptionSchema = new Schema({
    subscriber:{
        type:Schema.Types.ObjectId,// one who is scbcri
        ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
}) 


export const Subsciption = mongoose.model("Subsciption",subsciptionSchema)