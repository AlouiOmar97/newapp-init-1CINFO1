const Partie = require('../Models/partieModel')
const Joueur = require('../Models/joueurModel')
const socketIo = require('socket.io')

const createPartie =async (req, res, next)=>{
    await new Partie({
        nom: req.body.nom,
        joueur1: req.params.j1,
        joueur2: req.params.j2,
        etat: "en cours"
    }).save()
    .then((data, err)=>{
        if(err){
            res.json("error creating partie : "+ err)
        }
        res.json(data)
    })
    //res.json(req.body)
}

const readOnePartie =async (req, res, next)=>{
    await Partie.findById(req.params.id).then((data, err)=>{
        if(err){
            res.json("error reading One partie : "+ err)
        }
        res.json(data)
    })
}

const readAllParties =async (req, res, next)=>{
    await Partie.find().then((data, err)=>{
        if(err){
            res.json("error reading all parties : "+ err)
        }
        res.json(data)
    })
    //res.json("read ALL")
}

const updatePartie =async (req, res, next)=>{
    await Partie.findByIdAndUpdate(req.params.id, req.body)
    .then((data, err)=>{
        if(err){
            res.json("error updating partie : "+ err)
        }
        res.json(data)
    })
}

const deletePartie =async (req, res, next)=>{
    await Partie.findByIdAndDelete(req.params.id)
    .then((data, err)=>{
        if(err){
            res.json("error deleting partie : "+ err)
        }
        res.json(data)
    })
}

const showPartie = (req, res, next)=>{
    res.render('partie.html.twig')
}

function socketIO(server){
    const io = socketIo(server);
    io.on("connection",async (socket)=>{
        console.log('A new user is connected with socket id: '+ socket.id)
        socket.broadcast.emit('msg', 'A new user is connected !'+ socket.id)
        const msgs = await Partie.find()
        io.emit('allMsgs', msgs)
        socket.on('sendPartie',async (data)=>{
            console.log(data)
            io.emit('msg', "Partie : " + data.partie)
            io.emit('msg', "Id Joueur 1 : " + data.j1)
            io.emit('msg', "Id Joueur 2 : " + data.j2)
            await new Partie({
                nom: data.partie,
                joueur1: data.j1,
                joueur2: data.j2,
                etat: "en cours"
            }).save()
        })

        socket.on('afficherStat', async (data)=>{
            console.log(data);
            partie= data.partie
            const j1 = await Joueur.findById(data.j1)
            const j2 = await Joueur.findById(data.j2)
            statJoueurs = {
                partie,
                j1,
                j2
            }
            io.emit('msg', JSON.stringify(statJoueurs))
            io.emit('showStats', statJoueurs)
            
        })
        socket.on('isTyping', (data)=>{
            socket.broadcast.emit('msg', data.joueur1 + ' ' + data.msg)
        })
    })
    return io;
}

module.exports = { createPartie, readOnePartie, readAllParties, updatePartie, deletePartie, showPartie, socketIO }