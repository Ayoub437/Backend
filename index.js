const express = require("express");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");
//Import and configuration of "dotenv".
require("dotenv").config();

//Importing the routes
const user = require("./routes/user")

const app = express();

//Using the middlewares
app.use(bodyparser.json());
app.use(helmet());

//Using the routes
app.use("/user", user)

//Establish a connection with database
const ConnectToDatabase = async () => {
  try {
    //I put the URL, password and username of the database in the environment-file, because they are vulnerable for hacks.
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



//Next step: I have to create an endpoint