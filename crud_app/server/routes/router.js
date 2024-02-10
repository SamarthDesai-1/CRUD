const express = require("express");
const controller = require("../controller/controller");

const route = express.Router();


const axios = require('axios');

route.get("/", (request, response) => {

  axios.get("http://localhost:3000/api/users").then((res) => {
    console.log(res);
    response.render('index', { users: res.data });
  }).catch(error => {
    response.send(error);
  });

});

route.get("/add-user", (request, response) => {
  response.render('add-user');
});

route.get("/update-user", (request, response) => {
  response.render('update-user');
});

route.post("/api/users", controller.create);
route.get("/api/users", controller.find);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);

module.exports = route;