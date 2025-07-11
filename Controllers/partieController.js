const express = require('express')
const { createPartie, readAllParties, readOnePartie, updatePartie, deletePartie, showPartie } = require('../Services/partieService')
const validate = require('../Middlewares/partieValidation')
const router = express.Router()

router.post('/create/:j1/:j2', validate, createPartie)
router.get('/list', readAllParties)
router.get('/details/:id', readOnePartie)
router.put('/update/:id', updatePartie)
router.delete('/delete/:id', deletePartie)
router.get('/show', showPartie)

module.exports = router