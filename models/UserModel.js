const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim:true,
        minLength:2,
       },
    email: {
        type: String,
        require: true,
        unique: [true,'already registered with this email'],
    },
    password:{
        type:String,
        require:true
    },
   
})
userSchema.add({
       resetPasswordToken:{
        type:String,
        default:null,
    },  

    profilePic:{
        type:String,
        default:"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
    },
    coverPic:{
        type:String,
        default:"https://images.pexels.com/photos/268941/pexels-photo-268941.jpeg?cs=srgb&dl=pexels-pixabay-268941.jpg&fm=jpg"
    },
   
    bio:{
        type:String
    },

    city:{
        type:String
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users' 
    }

    ]

    },

)
module.exports = mongoose.model('users',userSchema)
