import mongoose,{Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const VideoSchema = new Schema(
    {
        videosFile:{
            type:String,
            required:true,
            
        },thumnail:{
            type:String,
            required:true,
            
        },title:{
            type:String,
            required:true,
            
        },description:{
            type:String,
            required:true,
            
        },duration:{
            type:Number,
            required:true,
            
        },views:{
            type:Number,
            default:0
            
        },isPublished:{
            type:Boolean,
            required:true,
            
        },owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
            
        },
    },{timestamps:true}
)

VideoSchema.plugin(mongooseAggregatePaginate)
export const Videos = mongoose.model("Videos",VideoSchema)    