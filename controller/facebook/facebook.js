
const { getUserProfile } = require("./helpers/page")
const { access_token } = require("../../config")
const util = require("util")
const Messenger_user = require("../../model/Messenger_user")
const Conversation = require("../../model/Conversation")
const Message = require("../../model/Message")
const User = require("../../model/User")
module.exports=(io)=>{
    
}

const getWebhook = (req, res, err) => {
    res.send(req.query["hub.challenge"])
}
const postWebhook = async (req, res, err) => {
    const entry = req.body.entry[0]
    console.log(JSON.stringify(entry), undefined, 2)

    if (!entry.messaging) {
        return res.sendStatus(200)
    }
    const messaging = entry.messaging[0]
    senderid = messaging.sender.id
    pageid = messaging.recipient.id
    message=messaging.message
    const data = await getUserProfile(senderid, access_token)
    Messenger_user.static


    const user=await Messenger_user.findOneAndUpdate(
        { messenger_id: senderid }, // find a document with that filter
        {
            messenger_id: senderid,
            page_id: pageid,
            name: data.name,
            image: data.profile_pic,
            gender: data.gender,
            locale: data.locale
        }, // document to insert when nothing was found
        { upsert: true, new: true, runValidators: true }
    );
    const adminUser=await User.findOne({connected_page:pageid,type:1})
    const conversation= await Conversation.findOneAndUpdate(
        { messenger_user: user._id }, // find a document with that filter
        {
            messenger_user: user._id,
            assigned_user:adminUser._id
        }, // document to insert when nothing was found
        { upsert: true, new: true, runValidators: true } // options

    );
    new Message({
        from:user._id,
        conversation:conversation._id,
        text:message.text
    }).save()
    
    if(messaging.postback){

    }else{
        
    }

    /*
     new Messenger_user({
            messenger_id:senderid,
            page_id:pageid,
            name:data.name,
            image:data.profile_pic,
            gender:data.gender,
            locale:data.locale
        }).save((err,user)=>{   
            
    
            Conversation.findOne({from:user._id})
            new Conversation({
    
            })
    
        })
      
      */



    res.send(200)

}

module.exports = {
    postWebhook,
    getWebhook
}
