const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
require('dotenv').config()

const saltRound = 10;
const secretKey = process.env.SECRET_KEY


const hashPassword = async (password)=>{
    let salt = await bcrypt.genSalt(saltRound);
    let hashedPassword = await bcrypt.hash(password,salt)
    return hashedPassword
}
let hashCompare = async (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}


const createToken = async(email,role)=>{
    let token = await jwt.sign({email,role},secretKey,{expiresIn:"180m"})
    return token
}

const jwtDecode = async (token) =>{
    let data = await jwt.decode(token)
    return data
}


const validate =async (req,res,next)=>{
    const token = req.header('token');
    if(!token) return res.status(401).send('Access denied. No token provided.');
    const data = await jwtDecode(token)
    const currentTime = Math.round(new Date()/1000)
    if(currentTime<=data.exp) {
        next()
    }    
    else{
        res.send({
            statusCode:401,
            message:"Token Expired"
        })
    }
}


module.exports={hashPassword,hashCompare,createToken,jwtDecode,validate}

