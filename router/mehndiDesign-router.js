const express=require("express");
const router=express.Router();

const {upload}  = require("../utils/services");
const { addMehndiDesign,getAllMehndiDesign,editMehndiDesign,editDesignImage,deleteMehndiDesign}=require("../controllers/mehndiDesignController")
 
// router.post("/addMehndiDesign",addMehndiDesign);
router.post("/addMehndiDesign",upload().single("image")  , addMehndiDesign);
router.get("/getAllMehndiDesign",getAllMehndiDesign )
router.patch("/editMehndiDesign/:id",editMehndiDesign )
router.patch("/editDesignImage/:id", upload().single("image"),editDesignImage );
router.delete("/deleteMehndiDesign/:id",deleteMehndiDesign )

module.exports=router;