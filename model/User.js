const mongoose=require("mongoose")
const Schema=mongoose.Schema
const User=new Schema({
            name:String,
            username:String,
            password:String,
            email:String,
            type:{
                type:Boolean,
                default:0
            },
            image:String,
            connected_page:String,
            page_access_token:String,
            group_users:[
                {
                    type:Schema.Types.ObjectId,
                    ref:"User"
                }
            ]
            
            



})


module.exports=mongoose.model("User",User)