require('../config/config')
const jwt = require('jsonwebtoken')
// const moment = require('moment')


exports.AuthorizatJWT = async function (req, res, next){
    let token = req.headers.authorization

    if(!token)
    return res.status(403).send({message: "Token no encontrado en el header"});

    
    await jwt.verify(token,  process.env.JWT_SECRET,  (err, data) => {      
        if (err) 
        {
            return res.json({ mensaje: 'Token no valido' });    

        }else
        {
            req.body.decode = data;   
            next();
        }
    });    
}