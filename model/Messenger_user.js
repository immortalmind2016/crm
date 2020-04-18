const mongoose=require("mongoose")
const Schema=mongoose.Schema
const Messenger_user=new Schema({
            name:String,
           
            image:String,
            type:{
                type:Boolean,
                default:0
            },
            image:String,
            profile_url:String,
            page_id:String,
            messenger_id:{
                type:String,
                unique:true
            },
            locale:String,
            gender:String
            



})


module.exports=mongoose.model("Messenger_user",Messenger_user)