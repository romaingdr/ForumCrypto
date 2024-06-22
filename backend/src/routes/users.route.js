module.exports = (app) => {
  const users = require("../controller/users.controller.js");

  let router = require("express").Router();

  // Retrieve all users

  router.get("/users", users.getUsers);

  // Create a new user

  router.post("/users/register", users.createUser);

  // Verify user credentials

  router.post("/users/login", users.loginUser);

  app.use("/api", router);
};
