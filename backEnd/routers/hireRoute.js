const { json } = require("body-parser");
const express = require("express");
const router = new express.Router();
const { find, update } = require("../models/userModel");
const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/Freelance_Nepal';
const Hire = require('../models/hireModel')
const User = require('../models/userModel')
const Gig = require('../models/gigModel')


router.post("/hires/showHires", async(req, res)=>{
    try {     
        const userID = req.body.userID;
        var hireList = [];

        const Hires = await Hire.find();
        const Freelancers = await User.find() 
        const Gigs = await Gig.find();

        var i = 0;

        var freelancerName;
        var gigTitle;
        var gigDescription;
        var gigCategory;
        var gigRate;
        var gigImage;
        for (i; i<Hires.length; i++){ 
            if (Hires[i].client == userID){
                var j = 0;
                var k = 0;
                for (j; j < Freelancers.length ; j++){
                    if (Freelancers[j]._id == Hires[i].worker){
                        freelancerName = Freelancers[j].firstName + Freelancers[j].lastName;
                    }
                    else {
                        freelancerName = "Account Deleted!"
                    }
                }
                for (k; k < Gigs.length ; k++){
                    if (Gigs[k]._id == Hires[i].gig){
                        gigTitle = Gigs[k].title,
                        gigDescription = Gigs[k].description
                        gigImage = Gigs[k].image
                        gigCategory = Gigs[k].category
                        gigRate = Gigs[k].rate
                    }
                }
                hireList.push({
                    'worker' : freelancerName,
                    'gigTitle' : gigTitle,
                    'gigImage' : gigImage,
                    'gigCategory' : gigCategory,
                    'gigRate' : gigRate,      
                });
            }
        }
        res.json(
            hireList
        )
    } 
    catch {
        res.send("error")
    }
}
)

router.post("/hires/showWorks", async(req, res)=>{
    try {   
        const userID = req.body.userID;
        var hireList = [];

        const Hires = await Hire.find();
        const Freelancers = await User.find() 
        const Gigs = await Gig.find();

        var i = 0;

        var freelancerName;
        var gigTitle;
        var gigDescription;
        var gigCategory;
        var gigRate;
        var gigImage;
        for (i; i<Hires.length; i++){
            if (Hires[i].worker == userID){
                var j = 0;
                var k = 0;
                for (j; j < Freelancers.length ; j++){
                    if (Freelancers[j]._id == Hires[i].client){
                        freelancerName = Freelancers[j].firstName + ' ' + Freelancers[j].lastName;
                    }
                    else {
                        freelancerName = "User Deleted Account!"
                    }
                }
                for (k; k < Gigs.length ; k++){
                    if (Gigs[k]._id == Hires[i].gig){
                        gigTitle = Gigs[k].title
                        gigDescription = Gigs[k].description
                        gigImage = Gigs[k].image
                        gigCategory = Gigs[k].category
                        gigRate = Gigs[k].rate
                    }
                }
                hireList.push({
                    'client' : freelancerName,
                    'gigTitle' : gigTitle,
                    'gigImage' : gigImage,
                    'gigCategory' : gigCategory,
                    'gigRate' : gigRate,       
                });
            }
        }
        res.json(
            hireList
        ) 
    } 
    catch {
        res.send("error")
    }
}
)

router.post("/hires/getEarning", async (req, res) => {
    try {   
        const userID = req.body.userID;
        const Hires = await Hire.find();
        const Gigs = await Gig.find();
        var earningCounter = 0;
        var i = 0;
        for (i; i<Hires.length; i++){
        
            if (Hires[i].worker == userID){
                var k = 0;
                for (k; k < Gigs.length ; k++){
                    if (Gigs[k]._id == Hires[i].gig){
                        earningCounter += parseFloat(Gigs[k].rate);
                    }
                }
            }
        }
        res.json(
            earningCounter
        )  
    } 
    catch {
        res.send("error")
    }
})
router.post("/hires/getInvestment", async (req, res) => {
    try {   
        const userID = req.body.userID;
        const Hires = await Hire.find();
        const Gigs = await Gig.find();
        var investmentCounter = 0;
        var i = 0;
        for (i; i<Hires.length; i++){
            if (Hires[i].client == userID){
                var k = 0;
                for (k; k < Gigs.length ; k++){
                    if (Gigs[k]._id == Hires[i].gig){
                        investmentCounter += parseFloat(Gigs[k].rate);
                    }
                }
            }
        }
        res.json(
            investmentCounter
        )  
    } 
    catch {
        res.send("error")
    }
})
router.post("/hires/addHire",async (req, res)=>{
    const hire = new Hire({
        client : req.body.client,
        worker : req.body.worker,
        gig : req.body.gig
    })

    try {   
        await hire.save();
        res.send("1") 
    } 
    catch (e)
    {
        res.send("0")
    }
})

router.post('/gig/getHireCount' , async (req, res)=>{
    try {     
        const userID = req.body.userID;
        var hireList = [];

        const Hires = await Hire.find();
        const Freelancers = await User.find() 
        const Gigs = await Gig.find();

        var i = 0;

        var freelancerName;
        var gigTitle;
        var gigDescription;
        var gigCategory;
        var gigRate;
        var gigImage;
        for (i; i<Hires.length; i++){ 
            if (Hires[i].client == userID){
                var j = 0;
                var k = 0;
                for (j; j < Freelancers.length ; j++){
                    if (Freelancers[j]._id == Hires[i].worker){
                        freelancerName = Freelancers[j].firstName + Freelancers[j].lastName;
                    }
                    else {
                        freelancerName = "Account Deleted!"
                    }
                }
                for (k; k < Gigs.length ; k++){
                    if (Gigs[k]._id == Hires[i].gig){
                        gigTitle = Gigs[k].title,
                        gigDescription = Gigs[k].description
                        gigImage = Gigs[k].image
                        gigCategory = Gigs[k].category
                        gigRate = Gigs[k].rate
                    }
                }
                hireList.push({
                    'worker' : freelancerName,
                    'gigTitle' : gigTitle,
                    'gigImage' : gigImage,
                    'gigCategory' : gigCategory,
                    'gigRate' : gigRate,      
                });
            }
        }
        res.json(
            hireList.length
        )
        
    } 
    catch {
        res.send("error")
    }
})
router.post('/gig/getWorkCount' , async (req, res)=>{
    try {   
        const userID = req.body.userID;
        var hireList = [];

        const Hires = await Hire.find();
        const Freelancers = await User.find() 
        const Gigs = await Gig.find();

        var i = 0;

        var freelancerName;
        var gigTitle;
        var gigDescription;
        var gigCategory;
        var gigRate;
        var gigImage;
        for (i; i<Hires.length; i++){
            if (Hires[i].worker == userID){
                var j = 0;
                var k = 0;
                for (j; j < Freelancers.length ; j++){
                    if (Freelancers[j]._id == Hires[i].client){
                        freelancerName = Freelancers[j].firstName + ' ' + Freelancers[j].lastName;
                    }
                    else {
                        freelancerName = "User Deleted Account!"
                    }
                }
                for (k; k < Gigs.length ; k++){
                    if (Gigs[k]._id == Hires[i].gig){
                        gigTitle = Gigs[k].title
                        gigDescription = Gigs[k].description
                        gigImage = Gigs[k].image
                        gigCategory = Gigs[k].category
                        gigRate = Gigs[k].rate
                    }
                }
                hireList.push({
                    'client' : freelancerName,
                    'gigTitle' : gigTitle,
                    'gigImage' : gigImage,
                    'gigCategory' : gigCategory,
                    'gigRate' : gigRate,       
                });
            }
        }
        res.json(
            hireList.length
        ) 
    } 
    catch {
        res.send("error")
    }
})

module.exports = router;