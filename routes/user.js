const express = require("express");
const { UserModel } = require("../models/User");

const user = express.Router();

//Signup
user.post("/Signup", (req, res) => {
  const FindUser = UserModel.findOne({
    email: req.body.email,
  });
});

module.exports = user;
