const express=require("express");
const router=express.Router();


const {customerRegisteration,customerLogin,getProfileById}=require("../controllers/auth-controller")

router.get("/",(req,res)=>{
    res.status(200).send("Welcome to SMENHDI APP auth router")
})

router.post("/createCustomer",customerRegisteration);
router.post("/login",customerLogin);

router.get("/getProfileById/:id",getProfileById )

module.exports=router;