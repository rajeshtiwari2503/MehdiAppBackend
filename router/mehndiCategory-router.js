const express=require("express");
const router=express.Router();


const { addMehndiCategory, getMehndiCategoryById,getAllMehndiCategory,editMehndiCategory,deleteMehndiCategory}=require("../controllers/designCategoryController")
 
router.post("/addMehndiCategory",addMehndiCategory);
router.get("/getAllMehndiCategory",getAllMehndiCategory )
router.get("/getMehndiCategoryById/:id",getMehndiCategoryById )
router.patch("/editMehndiCategory/:id",editMehndiCategory )
router.delete("/deleteMehndiCategory/:id",deleteMehndiCategory )

module.exports=router;