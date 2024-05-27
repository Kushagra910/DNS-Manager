const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connect = () => {
  mongoose.connect(process.env.DATABASE_URL).then(()=>{console.log("DB connected successfully")})
  .catch((err)=>{
    console.log("DB connection Failure");
    console.error(err);
    process.exit(1);
  })
}

module.exports = connect;