const os = require('os')

function info(req, res, next){
    res.json({
        hostname: os.hostname(),
        type: os.type(),
        platform: os.platform()
    })
}

const cpus = (req, res, next)=>{
    res.json(os.cpus())
}

const cpusDetails = (req, res, next)=>{
    res.json(os.cpus()[req.params.id])
}

module.exports = { info, cpus, cpusDetails }