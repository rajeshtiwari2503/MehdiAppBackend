const express=require("express");
const router=express.Router();


const { registeration, login ,getProfileById,getAllUser,editUser,deleteUser}=require("../controllers/auth-controller")

router.get("/",(req,res)=>{
    res.status(200).send("Welcome to SMENHDI APP auth router")
})

router.post("/registration",registeration);
router.post("/login",login);

router.get("/getProfileById/:id",getProfileById )
router.get("/getAllUser",getAllUser )
router.get("/editUser/:id",editUser )
router.get("/deleteUser/:id",deleteUser )

module.exports=router;