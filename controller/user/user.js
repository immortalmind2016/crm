var jwt = require('jsonwebtoken');
const mongoose=require("mongoose")

const User=mongoose.model("User")


const signupUser=(req,res,err)=>{

    const {email,password,name,username}=req.body.data
    let newUser=new User({
        username,
        password,
        email,
        name,
       
    })
    
    
    newUser.save((err,user)=>{
        console.log(err,user)
        if(err){
            return res.sendStatus(500)
        }
       
      
            res.sendStatus(200)
        
    })
  
}

const signinUser=(req,res,err)=>{
    const  {email,password}=req.body.data;
    console.log(req.body.data)


    User.findOne({email,password},(err,user)=>{
        if(user){
            let user_=user
            let token= jwt.sign({...user_},"secret",{ expiresIn: '365d' })
            res.json({token:"Bearer "+token})
           }else{
                return res.status(404).json(   {error:"wrong email or password",code:"#2"})

            }
        

     
    })
    
}

const getUser=async(req,res,err)=>{
 
   const user=await User.findOne({_id:req.user._id})
  
   if(!user)
   return res.sendStatus(404)
   res.json({user})

}
const getUsers=async(req,res,err)=>{
 
    const count=await User.find({}).count()
   

    res.json({count})
 
 }
const editUser=(req,res,err)=>{
 console.log("BODY ",req.body.data)
    User.findOneAndUpdate({_id:req.user._id},{...req.body.data},{new:true},(err,user)=>{
        res.json({user})
    })
   
}


module.exports={
    signinUser,
    signupUser,
    editUser,
    getUser,
    getUsers,

 
}
