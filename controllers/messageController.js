
let Message = require('../models/Message')
const Conversations = require('../models/Conversations')


const sendMessage = async(req,res)=>{
    const {friendId} = req.params
    const userId = req.user
    const {text} = req.body;
    const {file} = req.body;
try {
let message = await Message.create({
    friendId,
    userId,
    text,
    file
}) 
let conversation = await Conversations.findOne({members:{$all :[userId,friendId] } } );
if(!conversation){
    conversation = await Conversations.create({members:[userId,friendId]})
}
conversation.messages.push(message._id)
await conversation.save()
res.json({msg:'message sent successfully',success:true})
} catch (error) {
    res.json({msg:'message not sent ',success:false,error:error.message})
}
}

let getChat = async(req,res)=>{
    let userId = req.user;
    let {friendId} = req.params;

let messages = await Conversations.findOne({members: {$all:[userId,friendId] } } ).populate('messages')
if(!messages){
    messages={
        messages:[]
    }
}

res.json({msg:'get successfully',success:true,chat:messages.messages})

}




module.exports = {
sendMessage,
getChat
}



