const mongoose = require("mongoose");

const mehndiCategorySchema = new mongoose.Schema({
    categoryName: { type: String },
    description: { type: String },
    image: { type: String },
    status: { type: String, default: "ACTIVE" },
}, { timestamps: true });


const MehndiCategory=new mongoose.model("MehndiCategory",mehndiCategorySchema);

module.exports=MehndiCategory;