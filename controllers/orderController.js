
const Order = require("../models/order-model");


const addOrder = async (req, res) => {
    try {
        const { name } = req.body;
 
        const newOrder = new Order(req.body);
        
        await newOrder.save();

        res.json({ status: true, msg: "New Order Created." });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: "Server Error", error: err.message });
    }
};

 
 
  const getAllOrder = async (req, res) => {
    try {
        const data = await Order.find({}).sort({ _id: -1 });
        res.send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}
const getOrderById = async (req, res) => {
    try {
        let _id = req.params.id;
        let data = await Order.findById(_id);
        res.send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}

const editOrder = async (req, res) => {
    try {
        let _id = req.params.id;
        let body = req.body;
        let data = await Order.findByIdAndUpdate(_id, body);
        // if(body.status){
        //     const notification = new NotificationModel({
        //         OrderId: newData._id,
        //         OrderName: newData.name,
        //         title: `  Order  Verification `,
        //         message: `   Order  Verified     ${newData.name} !`,
        //      });
        // }
        res.json({ status: true, msg: "Order Updated" });
    } catch (err) {
        res.status(500).send(err);
    }
}
const deleteOrder = async (req, res) => {
    try {
        let _id = req.params.id;
        let data = await Order.findByIdAndDelete(_id);
        res.json({ status: true, msg: "Order Deteled" });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { addOrder,getOrderById,getAllOrder,editOrder,deleteOrder}