const express = require("express");
const cors = require("cors");
const { appConfig } = require("./config");
const api = require("./routes/api");

const app = express();

//  Settings
app.set("port", appConfig.port);

//  Last element of whiteList is the front-end development origin.
const whiteList = [
  "https://coreinventory.netlify.app",
  "http://coreinventory.netlify.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Origin:", origin);
      if (whiteList.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  Routes
app.get("/", (req, res) => res.send("Welcome to Core Inventory API"));
app.use("/api", api);

module.exports = app;
