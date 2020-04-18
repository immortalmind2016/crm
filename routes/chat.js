const Router=require("express").Router
const router=Router()
const {getConversationMessages,getUserConversations}=require("../controller/chat/chat")

//to get user conversations
router.get("/conversations",getUserConversations)

//to get messages of conversation
router.get("/messages/:id",getConversationMessages)


module.exports=router