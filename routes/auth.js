const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const user = mongoose.model("user")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const requireLogin = require('../middleware/requireLogin')

router.get('/protected', requireLogin, (req, res) => {
    res.send("hello user")
})

router.post('/signup', (req, res) => {
    const { name, email, password, Pic } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please fill up all fields" })
    }
    user.findOne({ email: email })
        .then((saveduser) => {
            if (saveduser) {
                return res.status(422).json({ error: "user alredy exist" })
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const User = new user({
                        email,
                        password: hashedpassword,
                        name,
                        Pic
                    })
                    User.save()
                        .then(User => {
                            res.json({ massage: "saved succesfully" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post("/signin", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "please add email and password" })
    }
    user.findOne({ email: email })
        .then(saveduser => {
            if (!saveduser) {
                return res.status(422).json({ error: "Invalid email or password" })
            }
            bcrypt.compare(password, saveduser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.json({ massage: "successfully sign in" })
                        const token = jwt.sign({ _id: saveduser._id }, JWT_SECRET)
                        const { _id, name, email, followers, following, Pic } = saveduser
                        res.json({ token: token, user: { _id, name, email, followers, following, Pic } })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid email or password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})


module.exports = router