const mongoose = require("mongoose");

const dbURL = 'mongodb://localhost:27017/Freelance_Nepal';
mongoose.connect(dbURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})