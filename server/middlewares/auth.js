const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth middleware
exports.auth = async(req,res,next) => {
  try{
    // extract token
    const token = req.cookies.token || req.body.token || 
                  req.header("Authorization").replace("Bearer ","");
    // if token missing 
    if(!token){
      return res.status(401).json({
        success:false,
        message:"Token is missing",
      });
    }

    // verify the token 
    try{
      const decode = await jwt.verify(token,process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch(err){
      // verification issues
      return res.status(400).json({
        success:false,
        message:"Token is invalid",
      });
    }
    next();

  } catch(err){
    return res.status(400).json({
      success:false,
      message:"Something went wrong while validating the token",
    });
  }
};