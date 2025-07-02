const Chat = require('../Models/chatModel')

const createChat =async (req, res, next)=>{
    await new Chat({
        content: req.body.content,
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

module.exports = { createChat, readOneChat, readAllChats, updateChat, deleteChat }