const mongoose = require ("mongoose");

const Hire = mongoose.Schema({
    client : {
        type : String,
    },
    worker : {
        type : String,
    },
    gig : {
        type : String
    }

})

module.exports = mongoose.model("Hire", Hire);