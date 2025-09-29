import mongoose, { Schema } from "mongoose";
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:"user"
    },
    subscription:[{
        type:Schema.Types.ObjectId,
        ref:"Courses"
    }]
},{
    timestamps:true
}
)
export const User = mongoose.model("User",schema);