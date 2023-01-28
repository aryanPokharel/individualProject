const express = require("express");
const app = express();
var cors = require('cors') 
var bodyParser = require('body-parser'); 

app.use(express.json())
app.use(cors()) 
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit : '200mb', extended:true}));

const {cloudinary} = require ('./utils/cloudinary');

require("./connection/connection");

const customerRoute = require("./routers/customerRoute");
const gigRoute = require("./routers/gigRoute")
const userRoute = require("./routers/userRoute")
const notificationRoute = require("./routers/notificationRoute")
const adminRoute = require("./routers/adminRoute")
const hireRoute = require("./routers/hireRoute")

app.use(customerRoute);
app.use(userRoute);
app.use(gigRoute);
app.use(notificationRoute);
app.use(adminRoute)
app.use(hireRoute)

app.listen(90);

