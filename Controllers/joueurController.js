const express = require('express')
const { createJoueur, readAllJoueurs, readOneJoueur, updateJoueur, deleteJoueur, showJoueur, attaque } = require('../Services/joueurService')
const validate = require('../Middlewares/joueurValidation')
const router = express.Router()

router.post('/create', validate, createJoueur)
router.get('/list', readAllJoueurs)
router.get('/details/:id', readOneJoueur)
router.put('/update/:id', updateJoueur)
router.put('/attaque/:j1/:j2', attaque)
router.delete('/delete/:id', deleteJoueur)
router.get('/show', showJoueur)

module.exports = router