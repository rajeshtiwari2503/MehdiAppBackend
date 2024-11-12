
const MehndiDesign = require("../models/mehndiDesign-model");
 

const addMehndiDesign = async (req, res) => {
    try {
      const body = req.body;
    //   console.log(body);
      
      const designImage = req.file?.location; // Image URL from S3
  
      const nameExist = await MehndiDesign.findOne({ name: body.name });
  
      if (nameExist) {
        return res.json({ status: false, msg: "Name already exists" });
      }
  
      const newDesign = new MehndiDesign({ ...body, image: designImage });
  
      await newDesign.save();
  
      res.json({ status: true, msg: "Design Created." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: "Server Error", error: err.message });
    }
  };
  

 
 
  const getAllMehndiDesign = async (req, res) => {
    try {
        const data = await MehndiDesign.find({}).sort({ _id: -1 });
        res.send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}
const getMehndiDesignById = async (req, res) => {
    try {
        let _id = req.params.id;
        let data = await MehndiDesign.findById(_id);
        res.send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}
const editDesignImage = async (req, res) => {
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
        const updatedDesign = await MehndiDesign.findByIdAndUpdate(
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



const editMehndiDesign = async (req, res) => {
    try {
        let _id = req.params.id;
        let body = req.body;
        console.log(body);
        
        let data = await MehndiDesign.findByIdAndUpdate(_id, body);
        // if(body.status){
        //     const notification = new NotificationModel({
        //         MehndiDesignId: newData._id,
        //         MehndiDesignName: newData.name,
        //         title: `  MehndiDesign  Verification `,
        //         message: `   MehndiDesign  Verified     ${newData.name} !`,
        //      });
        // }
        res.json({ status: true, msg: "MehndiDesign Updated" });
    } catch (err) {
        res.status(500).send(err);
    }
}
const deleteMehndiDesign = async (req, res) => {
    try {
        let _id = req.params.id;
        let data = await MehndiDesign.findByIdAndDelete(_id);
        res.json({ status: true, msg: "MehndiDesign Deteled" });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { addMehndiDesign,getAllMehndiDesign,editDesignImage,editMehndiDesign,deleteMehndiDesign}