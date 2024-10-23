const express=require("express");
const router=express.Router();


const { addOrder,getOrderById,getAllOrder,editOrder,deleteOrder}=require("../controllers/orderController")
 
router.post("/addOrder",addOrder);
router.get("/getAllOrder",getAllOrder )
router.patch("/getOrderById/:id",getOrderById )
router.patch("/editOrder/:id",editOrder )
router.delete("/deleteOrder/:id",deleteOrder )

module.exports=router;