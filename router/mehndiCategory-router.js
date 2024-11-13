const express=require("express");
const router=express.Router();
const {upload}  = require("../utils/services");

const { addMehndiCategory, getMehndiCategoryById,getAllMehndiCategory,editMehndiCategory,deleteMehndiCategory}=require("../controllers/designCategoryController")
 
router.post("/addMehndiCategory",upload().single("image") ,addMehndiCategory);
router.get("/getAllMehndiCategory",getAllMehndiCategory )
router.get("/getMehndiCategoryById/:id",getMehndiCategoryById )
router.patch("/editMehndiCategory/:id",upload().single("image") ,editMehndiCategory )
router.delete("/deleteMehndiCategory/:id",deleteMehndiCategory )

module.exports=router;