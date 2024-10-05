const mongoose = require("mongoose");

const URI =  process.env.MONGO_URL

// mongoose.connect()
// console.log(process.env.MONGO_URL);

const connectionDB = async () => {
    
    try {
        await mongoose.connect(URI)
        console.log("Connection successfully to DB");

    }
    catch (err) {
        console.log("Database connection failed");
        process.exit(0)
    }
}

module.exports=connectionDB

// const mongoose = require("mongoose");
// require("dotenv").config();

// mongoose.connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("Connection successful");
//   })
//   .catch((err) => {
//     console.error("No connection", err);
//   });
