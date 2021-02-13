const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Pic:{
        type:String,
        default:"https://res.cloudinary.com/dfkq2jpbw/image/upload/c_scale,h_773/a_0/v1611380153/profile_nt9wpa.png"
    },
    followers:[{type:ObjectId,ref:"user"}],
    following:[{type:ObjectId,ref:"user"}]
})

mongoose.model("user", userSchema)