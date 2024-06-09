require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const router = require("./Router/index");
const cookieParser = require("cookie-parser");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000", // Your frontend URL
  credentials: true, // Allow credentials (cookies, headers, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({ message: "running" });
});

app.use("/api", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running at", PORT);
  });
});
