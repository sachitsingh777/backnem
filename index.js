const express=require("express")
const app=express()
const cors=require(cors)
const {connection} =require("./db");
const { auth } = require("./middleware/authentication");
const { postRouter } = require("./routes/Post.router");
const { userRouter } = require("./routes/user.routes");
require('dotenv').config()
app.use(express.json());
app.use(cors())
app.get("/",(req,res)=>{
    res.send(" home Page")
})
app.use("/users",userRouter)


app.use(auth)

app.use("/posts",postRouter)



app.listen(process.env.port,async()=>{
  try{
    await connection
    console.log("connected to the db")
  }catch(err){
    console.log(err)
    console.log("Not connected to the db")    
  }
  console.log("server running at the port")
})