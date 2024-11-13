const MehndiCategory = require("../models/mehndiCategory-model")

const addMehndiCategory = async (req, res) => {

    try {
        const body = req.body;
    //   console.log(body);
      
      const designImage = req.file?.location; // Image URL from S3
  
      const nameExist = await MehndiCategory.findOne({ name: body.name });
  
      if (nameExist) {
        return res.json({ status: false, msg: "Name already exists" });
      }
        const newDesign = new MehndiCategory({ ...body, image: designImage });
  
        await newDesign.save();
    
        res.json({ status: true, msg: "Design Created." });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: "Server Error", error: err.message });
      }
    };

 
const getAllMehndiCategory = async (req, res) => {
    try {
        let data = await MehndiCategory.find({}).sort({ _id: -1 });
        res.send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}
const getMehndiCategoryById = async (req, res) => {
    try {
        let _id = req.params.id;
        let data = await MehndiCategory.findById(_id);
        res.send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}
 
const editMehndiCategory = async (req, res) => {
    try {
        const _id = req.params.id;

        // Get the file URL from the uploaded image
        const imageUrl = req.file ? req.file.location : null;

        // Create an update object with the fields that need to be updated
        const updateFields = { ...req.body };  // Get fields from request body
        if (imageUrl) {
            updateFields.image = imageUrl;  // Only update image field if it's provided
        }

        // Update the design using findByIdAndUpdate
        const updatedDesign = await MehndiCategory.findByIdAndUpdate(
            _id, 
            updateFields, 
            { new: true }  // Return the updated document
        );

        if (!updatedDesign) {
            return res.status(404).json({ status: false, msg: "Design not found" });
        }

        // Return the updated design as the response
        res.json({ status: true, msg: "Updated successfully", data: updatedDesign });
    } catch (err) {
        console.error("Error updating design:", err);
        res.status(500).json({ status: false, msg: "Error updating design", error: err.message });
    }
};

const deleteMehndiCategory = async (req, res) => {
    try {
        let _id = req.params.id;
        let data = await MehndiCategory.findByIdAndDelete(_id);
        res.json({ status: true, msg: "Mehndi Category Deteled" });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { addMehndiCategory,  getAllMehndiCategory, getMehndiCategoryById, editMehndiCategory, deleteMehndiCategory };