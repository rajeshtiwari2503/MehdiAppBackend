const mongoose = require("mongoose");

const mehndiDesignSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    title: { type: String },
    image: { type: String },
    status: { type: String, default: "ACTIVE" },
}, { timestamps: true });


const MehndiDesign=new mongoose.model("MehndiDesign",mehndiDesignSchema);

module.exports=MehndiDesign;