const topic = require("../controller/topic.controller");
const checkToken = require('../middleware/checkToken.middleware.js');

module.exports = (app) => {

    let router = require("express").Router();

    // Create a topic

    router.post("/topic", checkToken, topic.createTopic);

    // Get all topics

    router.get("/topic", topic.getAllTopics);

    // Get a topic by id

    router.get("/topic/:id", topic.getTopicById);

    // Get topics by category

    router.get("/topic/category/:category", topic.getTopicsByCategory);

    // Get topics by user

    router.get("/topic/user/:id", topic.getTopicsByUser);

    // Delete a topic

    router.delete("/topic/:id", topic.deleteTopic);

    app.use("/api", router);
};