import Admin from "./admin.schema.js";


//Controller for handling the CRUD operations on admin records.

export const createAdmin = async (req,res) => {
    try{
        const newAdmin = new Admin({ ...req.body});
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch(err) {
        res.status(400).json({
            message:err.message
        })
    }
}

export const getAdmin = async (req,res) => {
    try{
        const admins = await Admin.find();
        res.json(admins);
    } catch(err) {
        res.status(500).json({
            message:err.message
        })
    }
}

export const getAdminById = async (req,res) => {
    try{
        const admin = await Admin.findById(req.params.id);
        if(!admin){
            res.status(404).json({
                message:"Admin not found"
            })
        }
        res.json(admin);
    } catch(err) {
        res.status(500).json({
            message:err.message
        })
    }
}

export const updateAdmin = async (req,res) =>{
    try{
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedAdmin) {
        res.status(404).json({
            message:"Admin not found"
        })
        }
        res.json(updatedAdmin);
    } catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

export const deleteAdmin = async (req,res) => {
    try{
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
        if(!deletedAdmin){
            res.status(404).json({
                message:"Admin not found"
            })
        }
        res.json(deletedAdmin);
    } catch(err) {
        res.status(500).json({
            message:err.message
        })
    }
}

