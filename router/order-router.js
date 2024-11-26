const express=require("express");
const router=express.Router();


const { addOrder,verifiOrder,getOrderByUserId,getOrderById,getAllOrder,editOrder,deleteOrder}=require("../controllers/orderController")
 
router.post("/addOrder",addOrder);
router.post("/verify-payment",verifiOrder);
router.get("/getAllOrder",getAllOrder )
router.get("/getOrderById/:id",getOrderById )
router.get("/getOrderByUserId/:id",getOrderByUserId )
router.patch("/editOrder/:id",editOrder )
router.delete("/deleteOrder/:id",deleteOrder )

module.exports=router;