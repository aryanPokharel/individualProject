const { json } = require("body-parser");
const express = require("express");
const router = new express.Router();
const { find, update } = require("../models/gigModel");
const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/Freelance_Nepal';
const Gig = require('../models/gigModel')
const User = require('../models/userModel')
// const cloudinary = require('cloudinary')

const multer  = require('multer');
const { cloudinary } = require("../utils/cloudinary");

// Defining the storage
const storage = multer.diskStorage({
    destination : function (request, file, callback){
        callback (null, '../public/uploads/images/gigImages')
    },


    filename:function(request, file, callback){
        callback(null, Date.now() + file.originalname);
    }
}  
)

const upload = multer({
    storage : storage,  
    limits : {
        fieldSize : 1024 * 1024 * 7
    }
})


mongoose.connect(dbURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
const conn = mongoose.connection;

// We want to call a callback function when the event of open is performed by the connection object
// conn.on('open', ()=>{
router.get("/gig/showGig", async(req,res)=>{
   
    try {
        const Gigs = await Gig.find();
        var i = 0;
        var GigsList = [];

        for (i; i < Gigs.length; i++){
            GigsList.push(Gigs[i]);}

        res.json(
            Gigs
        )   
    } 
    catch {
        res.send("error")
    }
})


router.post('/gig/getGig' , async (req, res)=>{
    const gigID = req.body.id
    const gig = (await Gig.findById(gigID))
    res.json(gig);
})


router.post("/gig/userGig", async(req,res)=>{
    try {     
        const Gigs = await Gig.find();
        const userID = req.body.userID;

        var i = 0;
        var GigsList = [];
        for (i; i < Gigs.length; i++){
            if (Gigs[i].userID == userID)
            GigsList.push(Gigs[i]);}
        res.json(
            GigsList 
        )
        // I have cleaned the array after sending the response
        GigsList = [];
    } 
    catch {
        res.send("error")
    }
})

router.post("/gig/addGig", async(req,res)=>{

    try {
        var i = 0 ;
        const Users = await User.find();
        const givenUserID = req.body.userID;
        var freelancerName;
        var gig;
        
        for (i; i < Users.length; i++){

            if (givenUserID == Users[i]._id){
                freelancerName = Users[i].firstName + " " + Users[i].lastName 
            }
        }
        // Now we try to add the gig if the image is provided. Else, gig will be added without gigImage
        if ((req.body.image) != null){
            const fileStr = req.body.image
            const uploadedResponse = await cloudinary.uploader.upload(fileStr,{
                upload_preset : 'zestsaav'  
            })
        const imageURL = uploadedResponse.public_id;
            gig = new Gig ({
                title : req.body.title,
                category : req.body.category,
                technique : req.body.technique,
                description : req.body.description,
                rate : req.body.rate,
                // image : req.body.image,
                userID : req.body.userID,
                freelancerName : freelancerName, 
                image : imageURL
            })
        }
        else {
            console.log(req.body.userID)
            gig = new Gig ({
                title : req.body.title,
                category : req.body.category,
                technique : req.body.technique,
                description : req.body.description,
                rate : req.body.rate,
                // image : req.body.image,
                userID : req.body.userID,
                freelancerName : freelancerName, 
                image : 'gigs/gigImgNA_regd5a'
               
            })
        }
            await gig.save();
            res.send("1")
    } 
    catch (e)
    {
        console.log(e)
        res.send("0")
}
})

// This route just sends the data to be updated to the frontend
router.post('/gig/updateGig' , async (req, res)=>{
    const upId = req.body.id
    const toUpdate = (await Gig.findById(upId))
    res.json(toUpdate);
})


// This is the actual updating route
router.put('/gig/updateGig/:id' , async (req, res)=>{
    try 
    {
        const upId = req.params.id
        const updates = req.body
        const toUpdate = (await Gig.findByIdAndUpdate(upId, updates))
        res.send("1")
    }
    catch (e)
    {
        res.send("0")
    }
})

router.delete('/gig/deleteGig', async (req,res)=>{
    
    try{
        const delID = req.body.id
        const toDelete = (await Gig.findById(delID))
        toDelete.delete();
        res.send("1")
    }
    catch (e){
        res.send("0")
    }
})  

router.delete('/gig/deleteReactGig/:id', async (req,res)=>{
        
    try{
        const delID = req.params.id

        const toDelete = (await Gig.findById(delID))
        toDelete.delete();
        res.send("1")
    }
    catch (e){
        res.send("0")
    }
})

router.post('/gig/uploadFile', async(req,res) =>{
    try {
        
        const fileStr = req.body.data
        // console.log(req.body.data)
        const uploadedResponse = await cloudinary.uploader.upload(fileStr,{
            upload_preset : 'zestsaav'
        })
        // res.json({msg : "yaaaaa"})
    } catch (error) {
        console.log(error)
        
    }

})
router.get('/gig/images', async(req,res)=>{
    try {

    const {resources} = await cloudinary.search.expression('folder:gigs').sort_by('public_id', 'desc').execute();
    const publicIds = resources.map(file => file.public_id);
    res.send(publicIds)
    }
    catch (e){
        console.log(e)
    }
})
router.post('/gig/getImages', async(req,res)=>{
    try {
        const {resources} = await cloudinary.search.expression('folder:gigs').sort_by('public_id', 'desc').execute();
        const images = resources.map(file => file.public_id);      
    }
    catch (e){
        console.log(e)
    }
})
router.post('/gig/getGigCount' , async (req, res)=>{
    try {     
        const Gigs = await Gig.find();
        const userID = req.body.userID;

        var i = 0;
        var GigsList = [];
        for (i; i < Gigs.length; i++){
            if (Gigs[i].userID == userID)
            GigsList.push(Gigs[i]);}
        res.json(
            GigsList.length
        )

        // I have cleaned the array after sending the response
        GigsList = [];
    } 
    catch {
        res.send("error")
    }
})




module.exports = router;