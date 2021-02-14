const express = require('express')
const mongoose = require('mongoose')
const app = express()
const {PORT=5000} = process.env;
const {MONGOURI} = require('./keys')

mongoose.connect(MONGOURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected', ()=>{
    console.log("connected to mongoose yeahh")
})
mongoose.connection.on('error', ()=>{
    console.log(" error connected to mongoose yeahh")
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT, ()=>{
    console.log("server is running", PORT)
})