const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const osController = require('./Controllers/osController')
const productsController = require('./Controllers/productsController')
const chatController = require('./Controllers/chatController')
const joueurController = require('./Controllers/joueurController')
const partieController = require('./Controllers/partieController')
const config = require('./Config/db.json')
const mongoose = require('mongoose')
const { socketIO } = require('./Services/partieService')

app.set('views', path.join(__dirname, 'Views'))
app.set('view engine', 'twig')

app.use(express.json())

app.use('/os', osController)
app.use('/products', productsController)
app.use('/chat', chatController)
app.use('/joueur', joueurController)
app.use('/partie', partieController)

mongoose.connect(config.mongoDB.uri)
        .then(()=>{
            console.log('DB Connected Successfully !')
        })
        .catch((error)=>{
            console.log('Connection to DB failed : '+ error)
        })
const server = http.createServer(app)
const io = socketIO(server)
server.listen(3000, ()=>{
    console.log('Server started on 3000 !');
})