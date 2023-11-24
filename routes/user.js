const express = require("express");
const { UserModel } = require("../models/User");
const bcrypt = require("bcrypt");

const user = express.Router();

//Signup
user.post("/Signup", async (req, res) => {
  try {
    const FindUser = await UserModel.findOne({
      email: req.body.email,
    });
    if (FindUser) {
      res.status(401).send("User already exists, try another email");
    } else {
      bcrypt.genSalt(7, (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          const NewUser = await UserModel({
            password: hash,
            email: req.body.email,
            name: req.body.name,
          });
          await NewUser.save();
        });
      });
    }
    res.status(201).send("User signed up successfully");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = user;
