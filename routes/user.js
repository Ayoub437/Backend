const express = require("express");
const { signup, login } = require("../controllers/user");

const user = express.Router();

//Signup
user.post("/Signup", signup);

//Login
user.post("/login", login);

module.exports = user;
