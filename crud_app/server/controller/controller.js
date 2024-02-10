let userDB = require("../model/modal");

/* API's */

/* Create and save new user */
exports.create = (request, response) => {
  /* Validate request */

  if (!request.body) {
    response.status(400).send({
      msg: "Invalid Message",
    });
    return;
  }

  const user = new userDB({
    name: request.body.name,
    email: request.body.email,
    gender: request.body.gender,
    status: request.body.status,
  });

  /* Save user in database */
  user.save(user).then((data) => console.log(data)).catch((error) => console.log(error));

  response.status(200).send({ msg: "Success" });
};

/* Retrive and return all user OR Retrive and return a single user */
exports.find = (request, response) => {

  if (request.query.id) {
    const id = request.query.id;

    userDB.findById(id).then(data => {
      if (data) {
        return response.send(data);
      }
      return response.status(404).send({ msg: `Not found user with ID -> ${id}` });

    })
    .catch(error => {
      return response.status(500).send({ msg: error.message || "Error while fetching data" });
    })

  }
  else {
    userDB.find().then(data => response.status(200).send(data)).catch(error => {
      return response.status(500).send({ msg: error.message || "Error occured while reteriving data" });
    });
  }
  
};

/* Update a new identified user ID */
exports.update = (request, response) => {
  if (!request.body) {
    return response.status(400).send({ msg: "Data cannot be empty" });
  }

  const id = request.params.id;
  userDB.findByIdAndUpdate(id, request.body).then(data => {
    if (!data) {
      return response.status(404).send({ msg: `Cannot update user with specify ID -> ${id} maybe user not found` });
    }
    else {
      response.send(data);
    }
  }).catch(error => response.status(500).send({ msg: "Error in update user information" })); 

};

/* Delete a user with specified user ID */
exports.delete = (request, response) => {
  const id = request.params.id;

  userDB.findByIdAndDelete(id).then(data => {
    if (!data) {
      return response.status(404).send({ msg: "Delete data not found" });
    }
    else {
      response.send({ msg: `User ID -> ${id} is deleted successfully` });
    }
  }).catch(error => response.status(500).send({ msg: "Error in delete user information" })); 

};