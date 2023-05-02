const express=require("express")
const { PostModel } = require("../models/post.model")
const postRouter=express.Router()

postRouter.get("/",async(req,res)=>{
    try{
         const {device}=req.query
         const {authorID}=req.body
         let search={}
         if(device){
            search.device=device
         }

         if(authorID){
            search.authorID=authorID
         }

     const post=await PostModel.find(search)
     res.status(200).send(post)
    }catch(err){
        res.status(400).send({err:err.message})
    }
})
postRouter.post("/create",async(req,res)=>{
    try{
        const post=new PostModel(req.body)
        await post.save()
        res.status(200).send({"msg":"post has been created"})
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})


postRouter.patch("update/:postID",async(req,res)=>{
    const {postID}=req.params
    const post=await PostModel.findOne({_id:postID})

     try{
        if(req.body.authorID!==post.authorID){
            res.status(200).send({"msg":"you are not authorized"})
        }else{
            await PostModel.findByIdAndUpdate({_id:postID},req.body)
            res.status(200).send({"msg":`the post has been updated by id:${postID}`})
        }
     }catch(err){
        res.status(400).send({"err":err.message})
     }

})

postRouter.patch("delete/:postID",async(req,res)=>{
    const {postID}=req.params
    const post=await PostModel.findOne({_id:postID})

     try{
        if(req.body.authorID!==post.authorID){
            res.status(200).send({"msg":"you are not authorized"})
        }else{
            await PostModel.findByIdAndDelete({_id:postID},req.body)
            res.status(200).send({"msg":`the post has been deleted by id:${postID}`})
        }
     }catch(err){
        res.status(400).send({"err":err.message})
     }

})


module.exports={postRouter}