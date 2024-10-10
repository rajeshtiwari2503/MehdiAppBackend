
const Customer = require("../models/user-model");


const registeration = async (req, res) => {
    try {
        const { userName, email, contact, password } = req.body;

        const userExist = await Customer.findOne({ contact: contact });

        if (userExist) {
            return res.json({ status: false, msg: "Contact No. already exists" });
        }


        const newCustomer = new Customer({
            userName,
            email,
            contact,
            password,
        });


        await newCustomer.save();

        res.json({ status: true, msg: "Registration Successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: "Server Error", error: err.message });
    }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Customer.findOne({ email })

        if (!user) {
            return res.status(400).json({ status: false, msg: "Invalid Credentials" })
        }
        res.status(200).json({ status: true, msg: "  Login successful", user });
    }
    catch (err) {
        console.log(err);


    }
}
const getProfileById = async (req, res) => {
    try {
      let _id = req.params.id;
  
      // Fetch data from all models concurrently
      const [  userData] = await Promise.all([
        Customer.findById(_id),
     
      ]);
  
      // Combine the data into a single response
      const combinedData = {
       
        user: userData,
     
      };
  
      res.send(combinedData);
    } catch (err) {
      res.status(400).send(err);
    }
  };
  const getAllUser = async (req, res) => {
    try {
        const data = await Customer.find({}).sort({ _id: -1 });
        res.send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}
const getUserById = async (req, res) => {
    try {
        let _id = req.params.id;
        let data = await Customer.findById(_id);
        res.send(data);
    } catch (err) {
        res.status(400).send(err);
    }
}

const editUser = async (req, res) => {
    try {
        let _id = req.params.id;
        let body = req.body;
        let data = await Customer.findByIdAndUpdate(_id, body);
        // if(body.status){
        //     const notification = new NotificationModel({
        //         userId: newData._id,
        //         userName: newData.name,
        //         title: `  User  Verification `,
        //         message: `   User  Verified     ${newData.name} !`,
        //      });
        // }
        res.json({ status: true, msg: "User Updated" });
    } catch (err) {
        res.status(500).send(err);
    }
}
const deleteUser = async (req, res) => {
    try {
        let _id = req.params.id;
        let data = await Customer.findByIdAndDelete(_id);
        res.json({ status: true, msg: "User Deteled" });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { registeration, login ,getProfileById,getAllUser,editUser,deleteUser}