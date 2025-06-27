const createChat = (req, res, next)=>{
    res.json(req.body)
}

const readOneChat = (req, res, next)=>{
    res.json("read One")
}

const readAllChats = (req, res, next)=>{
    res.json("read ALL")
}

const updateChat = (req, res, next)=>{
    console.log(req.params.id);
    res.json(req.body)
}

const deleteChat = (req, res, next)=>{
    res.json('Chat deleted')
}

module.exports = { createChat, readOneChat, readAllChats, updateChat, deleteChat }