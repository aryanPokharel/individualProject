const { json } = require("body-parser");
const express = require("express");

const router = new express.Router();
const Customer = require("../models/customerModel");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth")


router.use(express.json())


router.post("/customer/register", (req,res)=>{
    const email = req.body.email;
    Customer.findOne({email : email})
    .then((result) => {
        if (result!== null){
            res.json({msg : "This user has already been registered!"})
            return; 
        }
    })
    .catch (e=>{
        console.log(e)  
    })
    const password = req.body.password;
    bcryptjs.hash(password, 10, (e,hashed_pw)=>{
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const age = req.body.age;
        const data= new Customer({
            firstName : firstName,
            lastName : lastName,
            age : age,
            password : password,
            email : email
        })
        data.save()
        .then(() => {
            res.json({message : "User Registered"})
        })
        const password = req.body.password;
        bcryptjs.compare(password, result.password, (e, success)=>{
            if (success == false){
                res.json({message : "Ivalid Credentials"})
            }
            // we are creating token/ticket/id card with logged in user id in it
            jwt.sign({customer_id : result._id}, "everest", (e, token)=>{
                res.json({token: token})
        })   })    })
})

router.put("/customer/update",auth.customerGuard, (req,res)=>{
    const token = req.headers.authorization;
    res.json(token)
})


// router.get("/user/login/", (req,res)=>{
//     res.send([{
//         "username" : "aryan2",
//         "password" : "aryan2"
//     }])
// })


router.post("/user/login/", (req,res)=>{
    username =  req.body.username;
    password =  req.body.password;
    
    if ((username == "aryan1") && (password == "aryan1")){
        res.send("1");
    }
    else {
        res.send("0"); 
    }
})




module.exports = router;