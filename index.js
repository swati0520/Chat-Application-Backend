const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 8092;
const cors = require('cors')
require('dotenv').config()


const connection = require('./db')// 
connection()


let userRouter = require('./routes/UserRoutes')
let postRouter = require('./routes/postRoutes')
let messageRouter = require('./routes/messageRoutes')


app.use(cors())
app.use(express.json({limit:'100mb'}))

app.set('view engine','ejs') 

 let users = new Map()

const addUserData = (id,socketId)=>{
    users.set(id,socketId)

}
io.on('connection', (socket) => {

socket.on('addUser',(userId)=>{
  console.log("userId = ", userId,socket.id)

  addUserData(userId,socket.id)
  
  });

  socket.on('sendMessage',({userId,friendId,message})=>{
    console.log(userId,friendId,message);

    let findFriend = users.has(friendId)
    console.log(findFriend);

    let userSocketId = users.get(friendId)
    console.log(userSocketId);
   socket.to(userSocketId).emit('getMessage',{userId,friendId,message})  
  })

  })

  
app.get('/' ,(req,res)=>{
    res.send('welcome page')

})

 app.use('/users',userRouter);
 app.use('/post',postRouter);
 app.use('/message',messageRouter)


server.listen(port, ()=>{
    console.log(`server is runnning on ${port}`);
})
 