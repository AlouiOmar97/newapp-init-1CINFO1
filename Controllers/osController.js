const express = require('express')
const { info, cpus, cpusDetails } = require('../Services/osService')
const router = express.Router()

router.get('/info', info)
router.get('/cpus', cpus)
router.get('/cpus/:id', cpusDetails)

module.exports = router