
const jwt = require('jsonwebtoken')

exports.tokenVerify = (req,res,next) => {

        const inputToken = req.header("Authorization")
        if(!inputToken){
            return res.status(400).send({error:'Unauthorized Access'})
        }else if(inputToken){
            const token = inputToken.split(' ')[1]
            jwt.verify(token, process.env.JWT_SECRET, (error, result) => {
                if(error){
                    res.send(error)
                }else{
                    req.userId = result._id
                    next()
                }
            })
        }
}