import mongoose from "mongoose";

const {Schema}  = mongoose;

const userSchema = new Schema({
    email: {type: 'string', required: true},
    password: {type:'string',required:true}
})

const User = mongoose.model("User",userSchema);