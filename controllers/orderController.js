
const Order = require("../models/order-model");

const Razorpay = require("razorpay");
const crypto = require('crypto');

// const addOrder = async (req, res) => {
//     try {
//         const { name } = req.body;
 
//         const newOrder = new Order(req.body);
        
//         await newOrder.save();

//         res.json({ status: true, msg: "New Order Created." });
//     }
//     catch (err) {
//         console.error(err);
//         return res.status(500).json({ status: false, msg: "Server Error", error: err.message });
//     }
// };

  // Ensure this points to your Order model

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const addOrder = async (req, res) => {
    // try {
    //     const { name, amount, currency } = req.body;
    
    //     if (!name || !amount || !currency) {
    //       return res.status(400).json({ status: false, msg: "Missing required fields." });
    //     }
    
    //     // Create Razorpay order
    //     const paymentOrder = await razorpay.orders.create({
    //       amount: amount * 100, // Amount in smallest currency unit
    //       currency,
    //       receipt: `receipt_${Date.now()}`,
    //       notes: { name },
    //     });
    
    //     // Save order in database
    //     const newOrder = new Order({
    //       name,
    //       amount,
    //       currency,
    //       razorpayOrderId: paymentOrder.id,
    //       status: "PENDING",
    //     });
    
    //     await newOrder.save();
    
    //     res.json({
    //       status: true,
    //       msg: "Order created successfully.",
    //       razorpayOrderId: paymentOrder.id,
    //       amount: paymentOrder.amount,
    //       currency: paymentOrder.currency,
    //     });
    //   } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ status: false, msg: "Server error.", error: err.message });
    //   }
    try {
        const {
          name,
          customerId,
          email,
          contact,
          address,
          agentName,
          agentId,
          design,
          designId,
          price,
          noOfPeople,
          selectedDate,
          alternateNumber,
          selectedTime,
          bridalMehndi,
          image,
          groupOrder,
          amount,
          currency
        } = req.body;
//   console.log(req.body);
  
        // Initialize Razorpay instance with your Razorpay credentials
        const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
  
        // Create the Razorpay order
        const razorpayOrder = await razorpay.orders.create({
          amount: amount * 100, // Razorpay expects the amount in paise (1 INR = 100 paise)
          currency: currency,
          receipt: `receipt_${new Date().getTime()}`,
          notes: {
            name,
            email,
            contact,
          },
        });
  
        // Create the order in MongoDB
        const newOrder = new Order({
          name,
          customerId,
          email,
          contact,
          address,
          agentName,
          agentId,
          design,
          designId,
          price,
          noOfPeople,
          selectedDate,
          alternateNumber,
          selectedTime,
          bridalMehndi,
          image,
          groupOrder,
          amount,
          currency,
          razorpayOrderId: razorpayOrder.id,
          status: 'PENDING', // Initially set status to 'PENDING'
        });
  
        await newOrder.save();
  
        // Send response with Razorpay order details
        res.status(200).json({
          status: true,
          razorpayOrderId: razorpayOrder.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
        });
      } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
          status: false,
          msg: 'Server error',
          error: error.message,
        });
      }
       
 
}
const verifiOrder= async (req, res) => {

    
    
    try {
        // console.log(req.body);
      const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
  
      const order = await Order.findOne({ razorpayOrderId });
      // console.log(order);
      if (!order) {
        return res.status(404).json({ status: false, msg: "Order not found." });
      }
  
      // Verify payment signature
      const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex");
  
      if (generatedSignature === razorpaySignature) {
        order.status = "PAID";
        order.razorpayPaymentId = razorpayPaymentId;
        order.razorpaySignature = razorpaySignature;
        await order.save();
  
        res.json({ status: true, msg: "Payment verified successfully." });
      } else {
        res.status(400).json({ status: false, msg: "Invalid payment signature." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: false, msg: "Server error.", error: err.message });
    }
}
 
  const getAllOrder = async (req, res) => {
    try {
        const data = await Order.find({}).sort({ _id: -1 });
        res.send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}
const getOrderByUserId = async (req, res) => {
    let _id = req.params.id;
    try { 
        const data = await Order.find({ customerId: _id }).sort({ _id: -1 });
        res.send(data);
    } catch (err) {
        res.status(400).send(err);
    }
};

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

module.exports = { addOrder,verifiOrder,getOrderByUserId,getOrderById,getAllOrder,editOrder,deleteOrder}