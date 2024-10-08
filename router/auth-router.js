const express=require("express");
const router=express.Router();


const {customerRegisteration,customerLogin}=require("../controllers/auth-controller")

router.get("/",(req,res)=>{
    res.status(200).send("Welcome to SMENHDI APP auth router")
})

router.post("/createCustomer",customerRegisteration);
router.post("/login",customerLogin);

module.exports=router;