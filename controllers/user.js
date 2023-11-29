const { UserModel } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmailToUser } = require("../services/email.service");
const { FindUserByEmail } = require("../services/user.service");

const Key = "lkasjclcnasdjllc";

const signup = async (req, res) => {
  try {
    const FindUser = await FindUserByEmail(req.body.email);
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
          const User = await NewUser.save();
          const Token = jwt.sign({ id: User._id }, Key); //That is a function that return a string.

          sendEmailToUser(
            "Account verification",
            "http://localhost:3000/verify/" + Token,
            req.body.email
          );
          res.status(201).send("User signed up successfully");
        });
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error is occured");
  }
};

const login = async (req, res) => {
  try {
    const FindUser = await FindUserByEmail(req.body.email);
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
      res.status(401).send("User doesn't exist");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { signup, login };
