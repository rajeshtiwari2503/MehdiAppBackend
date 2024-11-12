const MehndiCategory = require("../models/mehndiCategory-model")

const addMehndiCategory = async (req, res) => {

    try {
        let body = req.body;
        let data = new MehndiCategory(body);
        await data.save();
        res.json({ status: true, msg: "Mehndi Category  Added" });
    } catch (err) {
        res.status(400).send(err);
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
        let _id = req.params.id;
        let body = req.body;
        let data = await MehndiCategory.findByIdAndUpdate(_id, body);
        res.json({ status: true, msg: "Mehndi Category Updated" });
    } catch (err) {
        res.status(500).send(err);
    }
}
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