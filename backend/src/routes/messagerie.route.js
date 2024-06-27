const messagerie = require('../controller/messagerie.controller');
const checkToken = require('../middleware/checkToken.middleware.js');

module.exports = (app) => {

    let router = require("express").Router();

    // Get a user's conversations

    router.get("/conversations", checkToken, messagerie.getUserConversations);

    // Create a new conversation

    router.post("/conversations", checkToken, messagerie.createConversation);

    app.use("/api", router);
};

