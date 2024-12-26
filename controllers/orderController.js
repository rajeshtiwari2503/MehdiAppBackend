
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

// const addOrder = async (req, res) => {
//     // try {
//     //     const { name, amount, currency } = req.body;
    
//     //     if (!name || !amount || !currency) {
//     //       return res.status(400).json({ status: false, msg: "Missing required fields." });
//     //     }
    
//     //     // Create Razorpay order
//     //     const paymentOrder = await razorpay.orders.create({
//     //       amount: amount * 100, // Amount in smallest currency unit
//     //       currency,
//     //       receipt: `receipt_${Date.now()}`,
//     //       notes: { name },
//     //     });
    
//     //     // Save order in database
//     //     const newOrder = new Order({
//     //       name,
//     //       amount,
//     //       currency,
//     //       razorpayOrderId: paymentOrder.id,
//     //       status: "PENDING",
//     //     });
    
//     //     await newOrder.save();
    
//     //     res.json({
//     //       status: true,
//     //       msg: "Order created successfully.",
//     //       razorpayOrderId: paymentOrder.id,
//     //       amount: paymentOrder.amount,
//     //       currency: paymentOrder.currency,
//     //     });
//     //   } catch (err) {
//     //     console.error(err);
//     //     res.status(500).json({ status: false, msg: "Server error.", error: err.message });
//     //   }
//     try {
//         const {
//           name,
//           customerId,
//           email,
//           contact,
//           address,
//           agentName,
//           agentId,
//           design,
//           designId,
//           price,
//           noOfPeople,
//           selectedDate,
//           alternateNumber,
//           selectedTime,
//           bridalMehndi,
//           image,
//           groupOrder,
//           amount,
//           currency,
          
//         } = req.body;
// //   console.log(req.body);
  
//         // Initialize Razorpay instance with your Razorpay credentials
//         const razorpay = new Razorpay({
//           key_id: process.env.RAZORPAY_KEY_ID,
//           key_secret: process.env.RAZORPAY_KEY_SECRET,
//         });
  
//         // Create the Razorpay order
//         const razorpayOrder = await razorpay.orders.create({
//           amount: amount * 100, // Razorpay expects the amount in paise (1 INR = 100 paise)
//           currency: currency,
//           receipt: `receipt_${new Date().getTime()}`,
//           notes: {
//             name,
//             email,
//             contact,
//           },
//         });
//         const timeline = [
//           {
//             status: 'Order Created',
//             details: ['Order has been created successfully.'],
//             date: new Date(),
//           },
//           {
//             status: 'Payment Pending',
//             details: ['Awaiting payment from the customer.'],
//             date: new Date(),
//           },
//         ];
//         // Create the order in MongoDB
//         const newOrder = new Order({
//           name,
//           customerId,
//           email,
//           contact,
//           address,
//           agentName,
//           agentId,
//           design,
//           designId,
//           price,
//           noOfPeople,
//           selectedDate,
//           alternateNumber,
//           selectedTime,
//           bridalMehndi,
//           image,
//           groupOrder,
//           amount,
//           currency,
//           razorpayOrderId: razorpayOrder.id,
//           status: 'PENDING', // Initially set status to 'PENDING'
//           timeline: timeline,
//         });
  
//         await newOrder.save();
  
//         // Send response with Razorpay order details
//         res.status(200).json({
//           status: true,
//           razorpayOrderId: razorpayOrder.id,
//           amount: razorpayOrder.amount,
//           currency: razorpayOrder.currency,
//           timeline: newOrder.timeline,
//         });
//       } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(500).json({
//           status: false,
//           msg: 'Server error',
//           error: error.message,
//         });
//       }
       
 
// }
 
const addOrder = async (req, res) => {
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
      currency,
      paymentStatus, // Added payment status
      razorpayPaymentId, // Razorpay payment ID (assumed received after payment)
    } = req.body;

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

    // Create the order in MongoDB with initial timeline
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
      timeline: [
        {
          status: 'Order Created',
          details: ['Order has been created successfully.'],
          date: new Date(),
        },
        {
          status: 'Payment Pending',
          details: ['Awaiting payment from the customer.'],
          date: new Date(),
        },
      ],
    });

    await newOrder.save();

    // Log to confirm paymentStatus and razorpayPaymentId
    // console.log("Payment Status:", paymentStatus);
    // console.log("Razorpay Payment ID:", razorpayPaymentId);

    // If paymentStatus is "PAID", update the order status and timeline
    if (paymentStatus === 'PAID' && razorpayPaymentId) {
      // console.log("Updating order as paid");

      // Find the order by its ID
      const updatedOrder = await Order.findById(newOrder._id);
      
      // Check if the order exists
      if (!updatedOrder) {
        return res.status(404).json({ status: false, msg: 'Order not found' });
      }

      // Update the order's status and add "Payment Successful" status to the timeline
      updatedOrder.status = 'PAID';
      updatedOrder.timeline.push({
        status: 'Payment Successful',
        details: [`Payment received with payment ID: ${razorpayPaymentId}`],
        date: new Date(),
      });

      // Save the updated order
      await updatedOrder.save();

      // Send response with updated order details and timeline
      return res.status(200).json({
        status: true,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        timeline: updatedOrder.timeline,
      });
    }

    // Send response with Razorpay order details and initial timeline
    res.status(200).json({
      status: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      timeline: newOrder.timeline,
    });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      status: false,
      msg: 'Server error',
      error: error.message,
    });
  }
};


 
// const verifiOrder= async (req, res) => {

    
    
//     try {
//         // console.log(req.body);
//       const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
  
//       const order = await Order.findOne({ razorpayOrderId });
//       // console.log(order);
//       if (!order) {
//         return res.status(404).json({ status: false, msg: "Order not found." });
//       }
  
//       // Verify payment signature
//       const generatedSignature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//         .update(`${razorpayOrderId}|${razorpayPaymentId}`)
//         .digest("hex");
  
//       if (generatedSignature === razorpaySignature) {
//         order.status = "PAID";
//         order.razorpayPaymentId = razorpayPaymentId;
//         order.razorpaySignature = razorpaySignature;

//         order.timeline.push({
//           status: 'Payment Successful',
//           details: [`Payment verified successfully with payment ID: ${razorpayPaymentId}`],
//           date: new Date(),
//         });
//         await order.save();
  
//         res.json({ status: true, msg: "Payment verified successfully." });
//       } else {
//         res.status(400).json({ status: false, msg: "Invalid payment signature." });
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ status: false, msg: "Server error.", error: err.message });
//     }
// }
 
 const verifiOrder = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    // Find the order by Razorpay order ID
    const order = await Order.findOne({ razorpayOrderId });
    if (!order) {
      return res.status(404).json({ status: false, msg: "Order not found." });
    }

    // Verify payment signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature === razorpaySignature) {
      // Update order status to "PAID"
      order.status = "PAID";
      order.razorpayPaymentId = razorpayPaymentId;
      order.razorpaySignature = razorpaySignature;

      // Add "Payment Successful" status to the timeline
      const newTimeline = {
        status: 'Payment Successful',
        details: [`Payment verified successfully with payment ID: ${razorpayPaymentId}`],
        date: new Date(),
      };

      // Use the push method to add to the timeline field
      order.timeline.push(newTimeline);

      // Manually log the updated order to ensure the timeline is modified
      // console.log('Updated Order:', order);

      // Save the updated order
      const updatedOrder = await order.save();

      // Return the response with updated order timeline
      return res.json({ status: true, msg: "Payment verified successfully.", timeline: updatedOrder.timeline });
    } else {
      return res.status(400).json({ status: false, msg: "Invalid payment signature." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Server error.", error: err.message });
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