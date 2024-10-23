
const MehndiDesign = require("../models/mehndiDesign-model");


const addMehndiDesign = async (req, res) => {
    try {
        const { name } = req.body;

        const nameExist = await MehndiDesign.findOne({ name: name });

        if (nameExist) {
            return res.json({ status: false, msg: "name already exists" });
        }

        const newDesign = new MehndiDesign(req.body);
        
        await newDesign.save();

        res.json({ status: true, msg: "Design Created." });
    }
    catch (err) {
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

const editMehndiDesign = async (req, res) => {
    try {
        let _id = req.params.id;
        let body = req.body;
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

module.exports = { addMehndiDesign,getAllMehndiDesign,editMehndiDesign,deleteMehndiDesign}