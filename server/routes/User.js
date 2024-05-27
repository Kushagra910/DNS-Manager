const express = require("express");
const { login, signUp } = require("../controllers/Auth");
const router = express.Router()


// Authentication Routes

//route for user login

router.post('/login',login);

//route for user signup

router.post("/signup",signUp);

module.exports = router;