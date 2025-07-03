const yup = require('yup')
const validate = async (req,res,next)=>{
try {
    const schema = yup.object().shape({
        content: yup.string().min(3,"min 3 carac").required("Ceci est un champ obligatoire"),
        //email: yup.string().email().required()
    })
    await schema.validate(req.body, { abortEarly: false})
    next()
} catch (error) {
    res.json({
        error : error.errors
    })
}
}

module.exports = validate  