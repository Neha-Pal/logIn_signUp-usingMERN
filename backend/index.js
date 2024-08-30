const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeeModel = require("./models/employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Register", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/signup', async (req, res) => {
  try {
    const newEmployee = await employeeModel.create(req.body);
    res.json(newEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await employeeModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json("No record existed...");
    }

    // Compare the provided password directly
    if (password !== user.password) {
      return res.status(401).json("The password is incorrect");
    }

    res.json("success");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json("An error occurred during login");
  }
});

app.listen(3001, () => {
  console.log("This server is running");
});
