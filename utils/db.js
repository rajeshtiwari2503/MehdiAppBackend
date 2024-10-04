const mongoose = require("mongoose");

const URI =  process.env.MONGO_URL

// mongoose.connect()

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