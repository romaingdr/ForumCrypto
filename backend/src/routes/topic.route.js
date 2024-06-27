const topic = require("../controller/topic.controller");
const checkToken = require('../middleware/checkToken.middleware.js');

module.exports = (app) => {

    let router = require("express").Router();

    router.post("/topic", checkToken, topic.createTopic);

    router.get("/topic", topic.getAllTopics);

    router.get("/topic/:id", topic.getTopicById);

    router.get("/topic/category/:category", topic.getTopicsByCategory);

    router.get("/topic/user/:id", topic.getTopicsByUser);

    router.post("/topic/:id/tags", topic.addTags);

    router.get("/topic/:id/tags", topic.getTopicsByTags);

    router.delete("/topic/:id", topic.deleteTopic);

    app.use("/api", router);
};