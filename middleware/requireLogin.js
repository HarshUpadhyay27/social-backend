const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model("user")

module.exports= (req, res, next)=>{
    const {authorization} = req.headers
    // authorization === Bearer jjkbbjkbbkb
    if(!authorization){
        return res.status(401).json({error:"you must have a login"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must be login"})
        }
        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user=userdata
            next()
        })
    })
}