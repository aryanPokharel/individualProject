const { json } = require("body-parser");
const express = require("express");

const router = new express.Router();
const Admin = require("../models/adminModel")

router.use(express.json())


router.post("/admin/login", async (req,res)=>{
    try {  
        const Admins = await Admin.find();
        const username = req.body.username;
        const password = req.body.password;
        var i = 0;
        var AdminsList = [];
        var adminID;
        for (i; i < Admins.length; i++){
            AdminsList.push(Admins[i]);
        }
        var foundResponse = "0";
        for (var z= 0 ; z < Admins.length; z++){
            if (username == Admins[z].username){
                if (password == AdminsList[z].password){
                    foundResponse = "1";
                    adminID = Admins[z].id
                }
                else {
                    foundResponse = "2"   
                }   
            }
        }
        res.json({
            "foundResponse" : foundResponse,
            "adminID" : adminID
        })
    } 
    catch {
        res.send("error")
    }
})


module.exports = router;