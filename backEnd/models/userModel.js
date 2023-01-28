const mongoose = require ("mongoose");

const User = mongoose.Schema({
    firstName :{ 
        type : String,
        required : true
    },
    lastName :{ 
        type : String,
        
    },
    email : {
        type : String,
    },
    address : {
        type : String,
    },
    age : {
        type : String,
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    hires : {
        type : Object
    },
    works : {
        type : Object
    }
})

module.exports = mongoose.model("User", User)




