//middleware  --> middlewares are functions that have the access of requesting to an object , responding to an object , (or that have the access of request and response and can go to the next middleware function). they can modify the request and response
const jwt = require('jsonwebtoken')
let JWT_SECRET = "JohnCart@123"

const checkToken = (req, res, next)=>{
try {
    let token = req.headers.authorization;
    if(!token){
return res.json({msg:"token not found", success:false})
}
let decoded = jwt.verify(token,JWT_SECRET);
console.log(decoded._id);
req.user = decoded._id
next()
} catch (error) {
    return res.json({msg:"invalid token", success:false,error:error.message})
}
} 
module.exports = checkToken
