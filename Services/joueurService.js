const Joueur = require('../Models/joueurModel')
const socketIo = require('socket.io')

const createJoueur =async (req, res, next)=>{
    await new Joueur({
        pseudo: req.body.pseudo,
        sante: 100,
        score: 0
    }).save()
    .then((data, err)=>{
        if(err){
            res.json("error creating joueur : "+ err)
        }
        res.json(data)
    })
    //res.json(req.body)
}

const readOneJoueur =async (req, res, next)=>{
    await Joueur.findById(req.params.id).then((data, err)=>{
        if(err){
            res.json("error reading One joueur : "+ err)
        }
        res.json(data)
    })
}

const readAllJoueurs =async (req, res, next)=>{
    await Joueur.find().then((data, err)=>{
        if(err){
            res.json("error reading all joueurs : "+ err)
        }
        res.json(data)
    })
    //res.json("read ALL")
}

const updateJoueur =async (req, res, next)=>{
    await Joueur.findByIdAndUpdate(req.params.id, req.body)
    .then((data, err)=>{
        if(err){
            res.json("error updating joueur : "+ err)
        }
        res.json(data)
    })
}

const deleteJoueur =async (req, res, next)=>{
    await Joueur.findByIdAndDelete(req.params.id)
    .then((data, err)=>{
        if(err){
            res.json("error deleting joueur : "+ err)
        }
        res.json(data)
    })
}

const attaque =async (req, res, next)=>{
    let j1 = await Joueur.findById(req.params.j1)
    let j2 = await Joueur.findById(req.params.j2)
    j1.score = j1.score + 10
    j2.sante = j2.sante - 20
    await j1.save()
    await j2.save()
    res.json({
        attaquant: j1,
        victime: j2
    })
}

const showJoueur = (req, res, next)=>{
    res.render('joueur.html.twig')
}

function socketIO(server){
    const io = socketIo(server);
    io.on("connection",async (socket)=>{
        console.log('A new user is connected with socket id: '+ socket.id)
        socket.broadcast.emit('msg', 'A new user is connected !'+ socket.id)
        const msgs = await Joueur.find()
        io.emit('allMsgs', msgs)
        socket.on('sendMsg',async (data)=>{
            console.log(data)
            io.emit('msg', data.sante + " : " + data.msg)
            await new Joueur({
                pseudo: data.msg,
                sante: data.sante,
                score: new Date()
            }).save()
        })
        socket.on('isTyping', (data)=>{
            socket.broadcast.emit('msg', data.sante + ' ' + data.msg)
        })
    })
    return io;
}

module.exports = { createJoueur, readOneJoueur, readAllJoueurs, updateJoueur, deleteJoueur, showJoueur, socketIO, attaque }