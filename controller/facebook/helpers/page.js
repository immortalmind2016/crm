
const axios=require("axios")

const getUserProfile=(PSID,access_token)=>new Promise((resolve,reject)=>{
    axios.get(`https://graph.facebook.com/${PSID}?fields=name,first_name,last_name,profile_pic,gender,locale&access_token=${access_token}`).then((response)=>{
        console.log(response.data)
      resolve(response.data)
    }).catch((e)=>{
        console.log(e.response.data)
    reject(e)
    })
  })
const sendMessage=(access_token,message,user_id)=>new Promise((resolve,reject)=>{
axios.get(`https://graph.facebook.com/v6.0/me/messages?access_token=${access_token}`,{
    "messaging_type": "MESSAGE_TAG",
    "recipient": {
      "id": user_id
    },
    "message": {
      "text": user_id
    },
    "tag": "ACCOUNT_UPDATE"

}).then((response)=>{
    console.log(response.data)
    resolve(response.data)
}).catch((e)=>{
    console.log(e.response.data)
reject(e)
})
})
module.exports={
    getUserProfile,
    sendMessage
}