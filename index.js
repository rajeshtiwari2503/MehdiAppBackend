const  express=require("express");

require("dotenv").config();

const router=require("./router/auth-router")

const app =express();

const connectionDB=require("./utils/db")

app.use(express.json());

const authRouter=require("./router/auth-router")

// app.use("/api/auth",router)
  
app.use(authRouter)

app.get("/",(req,res)=>{
    res.status(200).send("Welcome to SMENHDI APP")
})

const PORT=process.env.PORT;

connectionDB().then(()=>{

app.listen(PORT,()=>{
    console.log(`Server is Running at port: ${PORT}`)
})
});