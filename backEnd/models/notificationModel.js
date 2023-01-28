const mongoose = require ("mongoose");

const Notification = mongoose.Schema({
    title :{ 
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    about : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Notification", Notification)