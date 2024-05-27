const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connect = require("./configs/db");
const dnsRoutes = require("./routes/DnsRoutes");
const authRoutes = require("./routes/User");
const cookieParser = require("cookie-parser");
dotenv.config();


const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
connect();

app.use('/api/v1/dashboard',dnsRoutes);
app.use('/api/v1/auth',authRoutes);

// default route
app.get("/",(req,res)=>{
  return res.json({
    success:true,
    message:`Your server is running `
  })
});

app.listen(port , ()=>{
  console.log(`server is up and running at port ${port} `)
})