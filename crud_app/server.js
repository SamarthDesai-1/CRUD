const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require("./server/database/connection");
const cors = require('cors');

const app = express();
app.use(cors());

function CONFIG() {
  dotenv.config({ path: 'config.env' });
}
CONFIG();

function logRequests() {
  app.use(morgan('tiny'));
}
logRequests();

function mongoDBconnection() {
  connectDB();
}
mongoDBconnection();

function bodyParser() {
  app.use(bodyparser.urlencoded({ extended: true }));
}
bodyParser();

function viewEngine() {
  app.set("view engine", "ejs");
  /* just for in case to make folder and inside it you create a index.ejs files app.set("views", path.resolve(__dirname, "views/ejs")); */
  app.set("views", path.resolve(__dirname, "views"));

  console.log("Function called viewEngine()");
}
viewEngine();

function loadAssets() {
  app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
  app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
  app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
}
loadAssets();

const PORT = process.env.PORT || 3000;

app.use("/", require("./server/routes/router"));

app.listen(PORT, () => {
  console.log(`App listenning at port localhost:${PORT}`);
});