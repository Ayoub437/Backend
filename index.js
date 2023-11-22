const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");
//Import and configuration of "dotenv".
require("dotenv").config();

const app = express();

//Using the middlewares
app.use(bodyparser.json());
app.use(helmet());

//Establish a connection with database
const ConnectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("Database is connected");
  } catch (error) {
    console.log(error.message);
  }
};

//Running the server
app.listen(3000, () => {
  ConnectToDatabase();
  console.log("Server is running");
});
