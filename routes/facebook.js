const Router=require("express").Router
const Message = require("../model/Message")
const User = require("../model/User")

const Conversation = require("../model/Conversation")
const {sendMessage} =require("../controller/facebook/helpers/page")
const router=Router()
const {getWebhook,postWebhook}=require("../controller/facebook/facebook")

module.exports=(io)=>{
    io.on("connection",(socket)=>{
        socket.on("sendMessageToConversation",async({userId,message,convId})=>{
            new Message({
                from:userId,
                conversation:convId,
                text:message.text
            }).save()
        //send message to fb conv
        const user=await User.findOne({_id:userId})
        const access_token=user.page_access_token
        const messenger_user=await  Conversation.findOne({assigned_to:userId}).populate("messenger_user")

        sendMessage(access_token,message,messenger_user.messenger_id)

        })

        
    })
    router.get("/webhook",getWebhook)

    router.post("/webhook",postWebhook)
    
    
    return router
}