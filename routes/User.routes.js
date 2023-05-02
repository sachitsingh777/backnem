const express=require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
  const { name , email , gender , password}=req.body
try{ 
    bcrypt.hash(password,8, async(err, hash) =>{
        const user=new UserModel({name,email,password:hash,gender})
        await user.save()
        res.send({msg:"user registed"})
    });
}catch(err){
   res.send("error in registering ")
}
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
             if(result){
                const token = jwt.sign({authorID:user._id,author:user.name },'masai');
                res.status(200).send({"msg":"login successfull","token":token})
             }else{
                res.status(200).send({"msg":"wrong credentials"})
             }
            });
        }
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

module.exports={userRouter}