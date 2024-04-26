import express from 'express';

import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

const  {JWT_SECRET} = process.env;

import User from './user.model'

// create a new user

export const newUser = async (req,res) => {
    try{
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                message:"User already exists"
            })
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({
            email,
            password:hashedPassword});
            await user.save();
            res.status(201).json({
                message:"User registered successfully"
            })
    } catch(err) {
        res.status(500).json({
            message:err.message
        })
    }
}

export const loginUser = async(req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                message:"User not found"
            })
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({
                message:"Password is incorrect"
            })
        }
        const token = jwt.sign({id:user._id}, JWT_SECRET, {expiresIn:'1h'});
        await User.save();
        res.send({token:token});

    } catch(err) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

export const updateUser = async (req,res) =>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user) {
            return res.status(400).json({
                message:"User not found"
            })
        }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updatedUser);
        res.status(200).json({
            message:"User has been updated successfully"
        })
    } catch(err) {
        res.status(500).json({
            message:err.message
        })
    }
}

export const deleteUser = async (req,res) => {
    try{
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id, req.body, {delete:true});
        if(!deletedUser) {
           return res.status(400).json({
            message:"User not found"
           })
        }
        res.json(deletedUser)
    } catch(err) {
        res.status(500).json({
            message:err.message
        })
    }
}