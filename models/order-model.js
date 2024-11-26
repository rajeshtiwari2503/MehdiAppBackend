const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: { type: String },
    customerId: { type: String },
    email: { type: String },
    contact: { type: String },
    address: { type: String },
    agentName: { type: String },
    agentId: { type: String },
    design:{ type: String },
    designId:{ type: String },
    price:{ type: String },
    noOfPeople: { type: String },
    selectedDate: { type: String },
    alternateNumber: { type: String },
    selectedTime: { type: String },
    bridalMehndi: { type: String },
    image: { type: String },
    groupOrder: {
        type: Boolean,
        default: false, // Default value if not provided
    },
    order: { type: String, default: "ORDER" },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    status: { type: String, enum: ["PENDING", "PAID", "FAILED"], default: "PENDING" },
   
}, { timestamps: true });


const Order=new mongoose.model("Order",orderSchema);

module.exports=Order;