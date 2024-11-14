const express=require("express");
const router=express.Router();
const {upload}  = require("../utils/services");

const { registeration, login ,agentRegistration,getProfileById,getAllUser,editUser,deleteUser}=require("../controllers/auth-controller")

router.get("/",(req,res)=>{
    res.status(200).send("Welcome to SMENHDI APP ")
})

router.post("/registration",registeration);
router.post("/agentRegistration",upload().single("aadharImage"),agentRegistration);
router.post("/login",login);

router.get("/getProfileById/:id",getProfileById )
router.get("/getAllUser",getAllUser )
router.patch("/editUser/:id",editUser )
router.delete("/deleteUser/:id",deleteUser )

module.exports=router;