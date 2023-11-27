const express = require("express");
const { UserModel } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = express.Router();

const Key = "lkasjclcnasdjllc";

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

//Login
user.post("/login", async (req, res) => {
  try {
    const FindUser = await UserModel.findOne({
      email: req.body.email,
    });
    if (FindUser) {
      const IsPasswordIdentical = bcrypt.compare(
        FindUser.password,
        req.body.password
      );

      if (IsPasswordIdentical) {
        const Token = jwt.sign({ id: FindUser._id }, Key);
        res.status(201).send(Token);
      } else {
        res.status(401).send("Password is wrong");
      }
    } else {
      res.status(401).send("User doesn't exist")
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = user;
