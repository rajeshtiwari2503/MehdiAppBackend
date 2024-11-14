const mongoose = require("mongoose");

const URI =  process.env.MONGO_URL

// mongoose.connect()
// console.log(process.env.MONGO_URL);

 

const connectionDB = async () => {
  try {
    // Ensure deprecation warnings are enabled
    mongoose.set('strictQuery', false); // Prevents strict query mode warnings
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Ensures a more stable connection
    });
    console.log("Database connection successful");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    // Gracefully exit the process
    process.exit(1);
  }
};

module.exports = connectionDB;


// const mongoose = require("mongoose");
// require("dotenv").config();

// mongoose.connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("Connection successful");
//   })
//   .catch((err) => {
//     console.error("No connection", err);
//   });
