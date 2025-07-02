const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const osController = require('./Controllers/osController')
const productsController = require('./Controllers/productsController')
const chatController = require('./Controllers/chatController')
const config = require('./Config/db.json')
const mongoose = require('mongoose')

app.set('views', path.join(__dirname, 'Views'))
app.set('view engine', 'twig')

app.use(express.json())

app.use('/os', osController)
app.use('/products', productsController)
app.use('/chat', chatController)

mongoose.connect(config.mongoDB.uri)
        .then(()=>{
            console.log('DB Connected Successfully !')
        })
        .catch((error)=>{
            console.log('Connection to DB failed : '+ error)
        })
const server = http.createServer(app)
server.listen(3000, ()=>{
    console.log('Server started on 3000 !');
})