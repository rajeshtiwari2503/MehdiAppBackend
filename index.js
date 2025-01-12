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

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST','PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle OPTIONS requests globally
app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(204); // No content, but successfully handled
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
  





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