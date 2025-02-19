const  express=require("express");

require("dotenv").config();

const router=require("./router/auth-router")

const app =express();

const connectionDB=require("./utils/db")
const cors = require('cors');

const authRouter=require("./router/auth-router")
const mehndiDesignRouter=require("./router/mehndiDesign-router")
const mehndiCategoryRouter=require("./router/mehndiCategory-router")
const order=require("./router/order-router")
const chat=require("./router/chat-router")




app.use(express.json());

const corsOptions = {
    origin: '*', // Replace '*' with specific domains for security
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Referer', 'Origin', 'X-Requested-With', 'Accept'],
    preflightContinue: false,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));



// Handle OPTIONS preflight requests
app.options('*', cors(corsOptions));

// Example Referrer-Policy header
app.use((req, res, next) => {
    res.header("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
});





// app.use("/api/auth",router)
// app.use("/api/auth",router)
// app.use("/api/auth",router)
  
app.use(authRouter)
app.use(mehndiDesignRouter)
app.use(mehndiCategoryRouter)
app.use(order)
app.use(chat)

app.get("/",(req,res)=>{
    res.status(200).send("Welcome to S MENHDI APP")
})

const PORT=process.env.PORT;

connectionDB().then(()=>{

app.listen(PORT,()=>{
    console.log(`Server is Running at port: ${PORT}`)
})
});