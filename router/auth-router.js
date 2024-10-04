const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    res.status(200).send("Welcome to SMENHDI APP auth router")
})


module.exports=router;