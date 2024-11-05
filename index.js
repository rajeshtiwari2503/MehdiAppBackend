const  express=require("express");

require("dotenv").config();

const router=require("./router/auth-router")

const app =express();

const connectionDB=require("./utils/db")

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all domains
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,PATCH'); // Allow specific methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    next();
  });
  

const authRouter=require("./router/auth-router")
const mehndiDesignRouter=require("./router/mehndiDesign-router")
const order=require("./router/order-router")
const chat=require("./router/chat-router")

// app.use("/api/auth",router)
  
app.use(authRouter)
app.use(mehndiDesignRouter)
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