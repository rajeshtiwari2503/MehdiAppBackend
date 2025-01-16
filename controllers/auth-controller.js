
const Customer = require("../models/user-model");

const generateReferralCode = (length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

// const registeration = async (req, res) => {
//     try {
//         const {  email, contact  } = req.body;

//         const userExist = await Customer.findOne({ contact: contact });

//         if (userExist) {
//             return res.json({ status: false, msg: "Contact No. already exists" });
//         }

//         const newUser = new Customer(req.body);
        
//         await newUser.save();

//         res.json({ status: true, msg: "Registration Successfully" });
//     }
//     catch (err) {
//         console.error(err);
//         return res.status(500).json({ status: false, msg: "Server Error", error: err.message });
//     }
// };

 

const registeration = async (req, res) => {
    try {
        const { email, contact, referralCode } = req.body;

        // Check if the contact number already exists
        const userExist = await Customer.findOne({ contact });
        if (userExist) {
            return res.json({ status: false, msg: "Contact No. already exists" });
        }

        // Handle referral code logic
        let referredByUser = null;
        if (referralCode) {
            referredByUser = await Customer.findOne({ referralCode });
            if (!referredByUser) {
                return res.json({ status: false, msg: "Invalid referral code" });
            }
        }

        // Generate a unique referral code for the new user
        let newReferralCode;
        do {
            newReferralCode = generateReferralCode();
        } while (await Customer.findOne({ referralCode: newReferralCode }));

        // Create the new user
        const newUser = new Customer({
            ...req.body,
            referralCode: newReferralCode,
            referredBy: referralCode || null,
        });

        await newUser.save();

        // Update referral count for the referring user
        if (referredByUser) {
            referredByUser.referralCount = (referredByUser.referralCount || 0) + 1;
            await referredByUser.save();
        }
        const responseData = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            contact: newUser.contact,
            profileImage: newUser.profileImage,
            aadharImage: newUser.aadharImage,
            address: newUser.address,
            pincode: newUser.pincode,
            role: newUser.role,
            verification: newUser.verification,
            referralCode: newUser.referralCode,
            referredBy: newUser.referredBy,
            referralCount: newUser.referralCount,
            status: newUser.status,
          };
        //   console.log("responseData",responseData);
          
        res.json({ status: true, msg: "Registration Successfully",user: responseData, referralCode: newReferralCode });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: "Server Error", error: err.message });
    }
};

// const agentRegistration = async (req, res) => {
//     try {
//         const body = req.body;

//         // Check if the file was uploaded and extract the S3 URL
//         const aadharImage = req.file ? req.file.location : null; // URL from S3 if file uploaded

//         // Log request data for debugging
//         console.log("Request body:", body);
//         console.log("Uploaded file:", req.file);

//         const { email, contact } = req.body;

//         // Check if the user already exists by contact
//         const userExist = await Customer.findOne({ contact });

//         if (userExist) {
//             return res.json({ status: false, msg: "Contact No. already exists" });
//         }

//         // Create new customer with aadharImage URL and other data
//         const newUser = new Customer({ ...body, aadharImage });

//         await newUser.save();

//         // Respond with success message
//         res.json({ status: true, msg: "Registration Successfully" });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ status: false, msg: "Server Error", error: err.message });
//     }
// };
 

const agentRegistration = async (req, res) => {
    try {
        const body = req.body;

        // Check if the file was uploaded and extract the S3 URL
        const aadharImage = req.file ? req.file.location : null; // URL from S3 if file uploaded

        // Log request data for debugging
        // console.log("Request body:", aadharImage);
        // console.log("Uploaded file:", req.file);

        const { email, contact, referralCode } = req.body;

        // Check if the contact number already exists
        const userExist = await Customer.findOne({ contact });
        if (userExist) {
            return res.json({ status: false, msg: "Contact No. already exists" });
        }

        // Validate referral code if provided
        let referredByUser = null;
        if (referralCode) {
            referredByUser = await Customer.findOne({ referralCode });
            if (!referredByUser) {
                return res.json({ status: false, msg: "Invalid referral code" });
            }
        }

        // Generate a unique referral code for the new agent
        let newReferralCode;
        do {
            newReferralCode = generateReferralCode();
        } while (await Customer.findOne({ referralCode: newReferralCode }));

        // Create new customer with aadharImage URL, referral code, and other data
        const newUser = new Customer({
            ...body,
            aadharImage,
            referralCode: newReferralCode,
            referredBy: referralCode || null,
        });

        await newUser.save();

        // Update referral count for the referring user
        if (referredByUser) {
            referredByUser.referralCount = (referredByUser.referralCount || 0) + 1;
            await referredByUser.save();
        }

        // Respond with success message and referral code
        const responseData = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            contact: newUser.contact,
            profileImage: newUser.profileImage,
            aadharImage: newUser.aadharImage,
            address: newUser.address,
            pincode: newUser.pincode,
            role: newUser.role,
            verification: newUser.verification,
            referralCode: newUser.referralCode,
            referredBy: newUser.referredBy,
            referralCount: newUser.referralCount,
            status: newUser.status,
          };
        //   console.log("responseData",responseData);
        res.json({
            status: true,
            msg: "Registration Successfully",
            user:responseData,
            referralCode: newReferralCode,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, msg: "Server Error", error: err.message });
    }
};


 

const login = async (req, res) => {
    try {
        const { email, password } = req.body; // 'identifier' can be either email or contact number
// console.log(email,password);

        // Find user by either email or contact number
        const user = await Customer.findOne({
            $or: [{ email: email }, { contact: +email }]
        });

        if (!user) {
            return res.status(400).json({ status: false, msg: "Invalid Credentials" });
        }

        // Directly compare password (not recommended)
        if (user.password !== password) {
            return res.status(400).json({ status: false, msg: "Invalid Credentials" });
        }

        // If login is successful, send response
        res.status(200).json({ status: true, msg: "Login successful", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, msg: "Server Error" });
    }
};

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

const getAllArtist = async (req, res) => {
    try {
      // Find users with the role "AGENT", sorted by the most recently created
      const data = await Customer.find({ role: "AGENT" }).sort({ _id: -1 });
      res.send(data);
    } catch (err) {
      // Return a 400 status code with the error message if something goes wrong
      res.status(400).send(err);
    }
  };
  

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

module.exports = { registeration, login ,agentRegistration,getProfileById,getAllUser,getAllArtist,editUser,deleteUser}