const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    contact: { type: String },
    address: { type: String },
    password: { type: String },
    profileImage: { type: String },
    role: { type: String, default: "CUSTOMER" },
    verification: { type: String, default: "VERIFIED" },
    otp: { type: Number },
    status: { type: String, default: "ACTIVE" },
}, { timestamps: true });


const Customer=new mongoose.model("Customer",customerSchema);

module.exports=Customer;