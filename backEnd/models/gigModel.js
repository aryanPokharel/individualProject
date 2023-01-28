const mongoose = require ("mongoose");

const Gig = mongoose.Schema({
    title : {
        type : String,
    },
    category : {
        type : String,
    },
    technique : {
        type : String
    },
    description : {
        type : String
    },
    rate : {
        type : String,
        required : true
    },
    image : {
        type : String
    },
    userID : {
        type : String,
    },
    freelancerName : {
        type : String,
    }
})

module.exports = mongoose.model("Gig", Gig);