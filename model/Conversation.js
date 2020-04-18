const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Conversation=new Schema({
            assigned_to:{
                type:Schema.Types.ObjectId,
                ref:"User",
                default:null
            },
            important:{
                type:Boolean,
                default:false
            },
            messenger_user:{
                type:Schema.Types.ObjectId,
                ref:"Messenger_user",
                unique:true
            }



})


module.exports=mongoose.model("Conversation",Conversation)