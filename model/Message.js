const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Message=new Schema({
            from:{
                type:Schema.Types.ObjectId,
                ref:"User"
            },
            conversation:{
                type:Schema.Types.ObjectId,
                ref:"Conversation"
            },
            seen:{
                type:Boolean,
                default:false
            },
            text:String
           
            



})


module.exports=mongoose.model("Message",Message)