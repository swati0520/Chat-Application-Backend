const mongooes = require("mongoose");
const messageSchema = new mongooes.Schema({
userId:{
    type:mongooes.Schema.ObjectId,
    ref: "users",

},
friendId:{
    type:mongooes.Schema.ObjectId,
    ref: "users",

},
text:{
    type:String,

}

})
messageSchema.add({
file:{
    type:String,   
}
})


module.exports = mongooes.model('message',messageSchema)

