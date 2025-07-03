const Chat = require('../Models/chatModel')
const socketIo = require('socket.io')

const createChat =async (req, res, next)=>{
    await new Chat({
        content: req.body.content,
        name: req.body.name,
        creationDate: new Date()
    }).save()
    .then((data, err)=>{
        if(err){
            res.json("error creating chat : "+ err)
        }
        res.json(data)
    })
    //res.json(req.body)
}

const readOneChat =async (req, res, next)=>{
    await Chat.findById(req.params.id).then((data, err)=>{
        if(err){
            res.json("error reading One chat : "+ err)
        }
        res.json(data)
    })
}

const readAllChats =async (req, res, next)=>{
    await Chat.find().then((data, err)=>{
        if(err){
            res.json("error reading all chats : "+ err)
        }
        res.json(data)
    })
    //res.json("read ALL")
}

const updateChat =async (req, res, next)=>{
    await Chat.findByIdAndUpdate(req.params.id, req.body)
    .then((data, err)=>{
        if(err){
            res.json("error updating chat : "+ err)
        }
        res.json(data)
    })
}

const deleteChat =async (req, res, next)=>{
    await Chat.findByIdAndDelete(req.params.id)
    .then((data, err)=>{
        if(err){
            res.json("error deleting chat : "+ err)
        }
        res.json(data)
    })
}

const showChat = (req, res, next)=>{
    res.render('chat.html.twig')
}

function socketIO(server){
    const io = socketIo(server);
    io.on("connection",async (socket)=>{
        console.log('A new user is connected with socket id: '+ socket.id)
        socket.broadcast.emit('msg', 'A new user is connected !'+ socket.id)
        const msgs = await Chat.find()
        io.emit('allMsgs', msgs)
        socket.on('sendMsg',async (data)=>{
            console.log(data)
            io.emit('msg', data.name + " : " + data.msg)
            await new Chat({
                content: data.msg,
                name: data.name,
                creationDate: new Date()
            }).save()
        })
        socket.on('isTyping', (data)=>{
            socket.broadcast.emit('msg', data.name + ' ' + data.msg)
        })
    })
    return io;
}

module.exports = { createChat, readOneChat, readAllChats, updateChat, deleteChat, showChat, socketIO }