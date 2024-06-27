const messagerie = require('../controller/messagerie.controller');
const checkToken = require('../middleware/checkToken.middleware.js');

module.exports = (app) => {

    let router = require("express").Router();

    // Get a user's conversations

    router.get("/conversations", checkToken, messagerie.getUserConversations);

    // Create a new conversation

    router.post("/conversations", checkToken, messagerie.createConversation);

    // Get a conversation's messages

    router.get("/conversations/:conversationId/messages", checkToken, messagerie.getConversationMessages);

    // Send a message to a conversation

    router.post("/conversations/:conversationId/messages", checkToken, messagerie.sendMessage);

    app.use("/api", router);
};

