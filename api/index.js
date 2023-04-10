// username: booking
//Hasło: nFKiapngQ6dn3aoF
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173/",
  })
);

mongoose.connect(
  "mongodb+srv://booking:nFKiapngQ6dn3aoF@cluster0.woyqt9j.mongodb.net/?retryWrites=true&w=majority"
);
mongoose2.connect(
  "mongodb+srv://booking:nFKiapngQ6dn3aoF@cluster0.woyqt9j.mongodb.net/?retryWrites=true&w=majority"
);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  res.json({ name, email, password });
});

app.listen(4000);
