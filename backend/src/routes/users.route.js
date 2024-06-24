module.exports = (app) => {
  const users = require("../controller/users.controller.js");
  const checkToken = require('../middleware/checkToken.middleware.js');

  let router = require("express").Router();

  // Retrieve all users

  router.get("/users", users.getUsers);

  // Create a new user

  router.post("/users/register", users.createUser);

  // Verify user credentials

  router.post("/users/login", users.loginUser);

  // Get user by id

  router.get("/user", checkToken, users.getUserById);

  // Get user by username

  router.get("/user/:username", users.getUserByUsername);

  app.use("/api", router);
};
