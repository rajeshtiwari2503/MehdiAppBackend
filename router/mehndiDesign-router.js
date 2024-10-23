const express=require("express");
const router=express.Router();


const { addMehndiDesign,getAllMehndiDesign,editMehndiDesign,deleteMehndiDesign}=require("../controllers/mehndiDesignController")
 
router.post("/addMehndiDesign",addMehndiDesign);
router.get("/getAllMehndiDesign",getAllMehndiDesign )
router.patch("/editMehndiDesign/:id",editMehndiDesign )
router.delete("/deleteMehndiDesign/:id",deleteMehndiDesign )

module.exports=router;