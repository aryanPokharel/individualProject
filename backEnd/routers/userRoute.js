const { json } = require("body-parser");
const express = require("express");
const router = new express.Router();
const { find, update } = require("../models/userModel");
const mongoose = require('mongoose');
const dbURL = 'mongodb://localhost:27017/Freelance_Nepal';
const User = require('../models/userModel')


router.post("/users/login", async(req, res)=>{
    console.log("login attempt")
    try {
        const Users = await User.find();
        var givenUsername = req.body.username;
        var givenPassword = req.body.password;
        var i = 0;
        var UsersList = [];
        var userID;
        for (i; i < Users.length; i++){
            UsersList.push(Users[i]);
        }
        var foundResponse = "0";
        for (var z= 0 ; z < Users.length; z++){
            if (givenUsername == Users[z].username){
                if (givenPassword == UsersList[z].password){
                    foundResponse = "1";
                    userID = Users[z].id
                }else {
                    foundResponse = "2"   
                }   }
        }
        res.json({
            "foundResponse" : foundResponse,
            "userID" : userID
        })
    } 
    catch {
        res.send("error")
    }})


router.post("/users/addUser",async (req, res)=>{

    const user = new User ({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        address : req.body.address,
        age : req.body.age,
        username : req.body.username,
        password : req.body.password
    })
    try {   
        await user.save();
        res.send("1")
        
    } 
    catch (e)
    {
        res.send("0")
    }
})

router.post("/users/profile",async (req, res)=>{
    try {
        const Users = await User.find();
        var givenUserID = req.body.userID;
        var i = 0;
        var UsersList = [];
        var userID;
        for (i; i < Users.length; i++){
            UsersList.push(Users[i]);
        }
        for (var z= 0 ; z < Users.length; z++){  
            if (givenUserID == Users[z]._id){
                res.json({
                    "firstName" : Users[z].firstName,
                    "lastName" : Users[z].lastName,
                    "email" : Users[z].email,
                    "address" : Users[z].address,
                    "age" : Users[z].age,
                    "username" : Users[z].username,
                    "password" : Users[z].password
                })      
            }
        }  
    } 
    catch {
       
        res.send("error")
    }
})

router.get("/users/getUsers", async(req, res)=>{

    try {  
        const Users = await User.find();
        res.json(Users)
    } 
    catch {
       
        res.send("error")
    }
})
router.put('/users/updateUser/:id', async (req,res)=>{
    
    try{
    
        const upID = req.params.id
        const updates = req.body
        const toUpdate = (await User.findByIdAndUpdate(upID, updates))
        res.send("1")
    }
    catch (e){
        res.send("0")
    }
})
router.delete('/users/deleteUser/:id', async (req,res)=>{
    try{
        const delID = req.params.id
        const toDelete = (await User.findById(delID))
        toDelete.delete();
        res.send("1")
    }
    catch (e){
        res.send("0")
    }
})
router.put('/users/addHire/:id' , async (req, res)=>{
    try 
    {
        const upId = req.params.id
        const updates = req.body
        const toUpdate = (await User.findByIdAndUpdate(upId, updates))
        res.send("1")
    }
    catch (e)
    {
        console.log(e.message)
        res.send("0")
    }
})


module.exports = router;