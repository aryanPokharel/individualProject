
const { json } = require("body-parser");
const express = require("express");


const router = new express.Router();
const { find } = require("../models/notificationModel");

const dbURL = 'mongodb://localhost:27017/Freelance_Nepal';
const Notification = require('../models/notificationModel')

router.get("/notification/showNotification", async (req,res)=>{

    const notifications = await Notification.find();
    
    res.json({
        notifications
    },
   )
    
})

router.post("/notification/addNotification", async(req, res)=>{
    const notification = new Notification(
        {
            title : req.body.title,
            description : req.body.description, 
            about : req.body.about
        }   
    )

    try {
        await notification.save();
        res.send("1")
    } 
    catch {
        res.send("0")
    }
})

router.delete('/notification/deleteNotification/:id', async (req,res)=>{
    try{
        const delID = req.params.id
        const toDelete = (await Notification.findById(delID))
        toDelete.delete();
        res.send("1")
    }
    catch (e){
        res.send("0")
    }
})




module.exports = router;