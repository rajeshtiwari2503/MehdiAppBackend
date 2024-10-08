
const Customer = require("../models/user-model");


const customerRegisteration = async (req, res) => {
    try {
        const { userName, email, contactNo, password } = req.body;

        const userExist = await Customer.findOne({ contactNo: contactNo });

        if (userExist) {
            return res.json({ status: false, msg: "Contact No. already exists" });
        }


        const newCustomer = new Customer({
            userName,
            email,
            contactNo,
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



const customerLogin = async (req, res) => {
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


module.exports = { customerRegisteration, customerLogin }