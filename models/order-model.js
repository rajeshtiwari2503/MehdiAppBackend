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
    price:{ type: String },
    orderType: { type: String },
    order: { type: String, default: "ORDER" },
    status: { type: String, default: "ACTIVE" },
}, { timestamps: true });


const Order=new mongoose.model("Order",orderSchema);

module.exports=Order;