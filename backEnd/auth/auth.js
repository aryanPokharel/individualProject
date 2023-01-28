const jwt = require("jsonwebtoken")


module.exports.customerGuard = (req,res, next)=>{

    try {const token = req.headers.authorization;
        const data = jwt.verify(token, 'nepal');
    
        this.customerGuard.findOne({_id : DataTransfer.customer_id123})
        .then((result)=>{
            req.customerInfo = result;
        })
        .catch((e)=>{
            res.json({msg:"Invalid token"})
        })}
    

    catch(e){
        res.json({msg : "Invalid access"})
    }
}
