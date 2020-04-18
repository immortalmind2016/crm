
const Messenger_user = require("../../model/Messenger_user")
const Conversation = require("../../model/Conversation")
const Message = require("../../model/Message")

const getConversationMessages = async (req, res, err) => {
   const convId=req.params.id
   const messages= await Message.find({conversation_id:convId})
   res.json({messages})
}
const getUserConversations=async(req,res,err)=>{
    const userId=req.user._id
    const conversations= await Conversation.find({assigned_to:userId})
    res.json({conversations})
}




module.exports = {
    getConversationMessages,
    getUserConversations
}
