const mongoose = require('mongoose');
const connnectToDB = async()=>{
try {
  let data = await mongoose.connect(process.env.MONGO_URI)// data base url nd name

  //'mongodb://127.0.0.1:27017/mediaApp'

  
  console.log("connected to mongodb succesfully"); 
} catch (error) {
  console.log("error is connecting mongodb");
}
}
module.exports = connnectToDB