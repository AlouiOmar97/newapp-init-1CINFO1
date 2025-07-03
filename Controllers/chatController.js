const express = require('express')
const { createChat, readAllChats, readOneChat, updateChat, deleteChat, showChat } = require('../Services/chatService')
const validate = require('../Middlewares/chatValidation')
const router = express.Router()

router.post('/create', validate, createChat)
router.get('/list', readAllChats)
router.get('/details/:id', readOneChat)
router.put('/update/:id', updateChat)
router.delete('/delete/:id', deleteChat)
router.get('/show', showChat)

module.exports = router