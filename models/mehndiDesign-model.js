const mongoose = require("mongoose");

const mehndiDesignSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    // categoryName: { type: String },
    // categoryId: { type: String },
    price: { type: String },
    image: { type: String },
    groupOrder: {
        type: Boolean,
        default: false, // Default value if not provided
    },
    status: { type: String, default: "ACTIVE" },
}, { timestamps: true });


const MehndiDesign=new mongoose.model("MehndiDesign",mehndiDesignSchema);

module.exports=MehndiDesign;