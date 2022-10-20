const mongoose = require('mongoose');
const validator = require('validator') 

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:[true, 'Please enter your email address'],
        lowercase:true,
        unique:true,
        validate:(value)=>{
            return validator.isEmail(value)
        }
    },
    profile:{
        type:String,
        required:true,
    },  
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        max:100
    },
    dob:{
        type:String,
    },
    number:{
        type:Number,
    },
    gender:{
        type:String,
        enum:['male','female' ]
    }

})

module.exports = mongoose.model('User',userSchema);