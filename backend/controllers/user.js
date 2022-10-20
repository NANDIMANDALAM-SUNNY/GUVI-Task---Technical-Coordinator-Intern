const userSchema = require("../models/user");
const { hashPassword, hashCompare, createToken, jwtDecode } = require("../utils/util");
const {cloudinary} = require('../config/cloudinary');
const Register = async (req,res) =>{
    try {
    const {name, email, profile,password} = req.body;
    if(!name || !email || !profile || !password)
        return res.send({statusCode:"422",message:"Please fill all the fields"});
    else{
        const exist = await userSchema.findOne({email:email})
        if(exist)
            res.send({statusCode:409,message:"User already exists",})
        else{
            const hashedPassword = await hashPassword(req.body.password)
            const uploadResponse = await cloudinary.uploader.upload(profile, {upload_preset: 'guvi-task',})
            const newUser = new userSchema({name,email,"profile":uploadResponse.url,password:hashedPassword})
            await newUser.save()
            res.send({statusCode:200,message:"Registered sucessfully",data:newUser}) 
            }
        }
    }
    catch (error) {
        if(error.name === 'ValidationError')
        return res.send({message:handleValidationError(error)})
     res.send({statusCode:500,message: "Internal server error",message:error})
        }
}

const Login = async (req,res)=>{
    try {
        const {email,password} = req.body
        if(!email ||!password)
          return res.send({statusCode:"422",message:"Please fill all the fields"});
        else{
            const userLogin = await userSchema.findOne({email})
            if(!userLogin)
                return res.send({statusCode:404,message:"User not found"})
            const compare = await hashCompare(password,userLogin.password)
            if(!compare)
                return res.send({statusCode:403,message:"Authentication failed"})
            const token = await createToken(userLogin.email)
                res.send({statusCode:200,message:"Login sucessfully",data:token})
        }
    } catch (error) {
        res.send({statusCode:500,message: "Internal server error"})
    }
}

const Profile = async(req,res)=>{
    try {
        const token = req.header('token');
        const decoded = await jwtDecode(token)
        const user = await userSchema.findOne({email:decoded.email})
        if(!user)
            return res.send({statusCode:404,message:"User not found"})
        const {name,email,profile,age,dob,gender,number} = user
       res.send({statusCode:200,message:"Profile fetched sucessfully",data:{name,email,profile,age,dob,gender,number}})
    } catch (error) {
        res.send({statusCode:500,message: "Internal server error"})
    }
}


const UpdateProfile = async (req,res)=>{
    try {
        const {age, dob, number, gender} = req.body
        if(!age ||!dob ||!number || !gender)
            return res.send({statusCode:"422",message:"Please fill all the fields"});
        const token = req.header('token');
        const decoded = await jwtDecode(token)
        const user = await userSchema.findOne({email:decoded.email})
        if(!user)
            return res.send({statusCode:404,message:"User not found"})
        const update = await userSchema.updateOne({email:decoded.email},{$set:{age, dob, number, gender}},{runValidators:true})
            res.send({statusCode:200,message:"Updated sucessfully",data:update})
    } catch (error) {
        if(error.name === 'ValidationError')
           return res.send({message:handleValidationError(error)})
        res.send({statusCode:500,message: "Internal server error"})
    }
}

const handleValidationError = (err) => {
    let message;
    const key = Object.keys(err.errors);
    if (err.errors[key[0]] && err.errors[key[0]].properties) {
      message = err.errors[key[0]].properties.message;
    }
    return message;
  }
  

module.exports = {Register, Login, Profile, UpdateProfile}
