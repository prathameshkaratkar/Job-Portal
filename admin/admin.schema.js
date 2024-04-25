import mongoose from "mongoose";
import {v4 as uuidv4} from "uuid";

const {Schema}  = mongoose;

const adminSchema = new Schema({
   
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
   
    
},
    {
        timestamps: true
    }
)

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;