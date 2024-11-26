const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    contact: { type: String },
    password: { type: String },
    profileImage: { type: String },
    aadharImage: { type: String },
    aadharNo: { type: String },
    address: { type: String },
    pincode: { type: String },
    
    role: { type: String },
    verification: { type: String, default: "VERIFIED" },
    otp: { type: Number },
    referralCode: { type: String, unique: true }, // User's referral code
    referredBy: { type: String }, // The referral code used by this user
    referralCount: { type: Number, default: 0 },
    status: { type: String, default: "ACTIVE" },
}, { timestamps: true });


const Customer=new mongoose.model("Customer",customerSchema);

module.exports=Customer;