const express=require('express')
const bodyParser=require("body-parser")
const app=express()
const facebook=require("./routes/facebook")
const chat=require("./routes/chat")
const user=require("./routes/user")
const http=require("http")
const mongoose=require('mongoose')
mongoose.connect("mongodb://immortalmind:0115120323a@ds037627.mlab.com:37627/crm")
app.use(bodyParser.json())

var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use("/api/facebook",facebook(io))
app.use("/api/chat",chat)
app.use("/api/user",user)

server.listen(5000)