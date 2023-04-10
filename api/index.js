// username: booking
//Hasło: nFKiapngQ6dn3aoF
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User.js");
const cors = require("cors");

require("dotenv").config();

const app = express();
const bcryptSalt = bcrypt.genSaltSync(8);

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to database"))
  .catch((e) => console.log(e));

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(newUser);
  } catch {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  const UserDoc = await User.findOne({ email });
  if (UserDoc) {
    res.json("found");
  } else {
    res.json("not found");
  }
});

app.listen(4000);
