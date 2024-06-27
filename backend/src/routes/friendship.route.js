const friendship = require("../controller/friendship.controller");
const checkToken = require('../middleware/checkToken.middleware.js');

module.exports = (app) => {

    let router = require("express").Router();

    // Send friend request

    router.post("/friend_requests", friendship.sendFriendRequest);

    // Get friend status

    router.get("/friendship/:id_sender/:id_receiver", friendship.getFriendStatus);

    // Get user's friend requests

    router.get("/friend_requests/:id", friendship.getFriendRequests);

    // Accept friend request

    router.put("/friend_requests/accept/:id", friendship.acceptFriendRequest);

    // Add friend

    router.post("/friendship/:id", friendship.addFriend);

    // Reject friend request

    router.delete("/friend_requests/reject/:id", friendship.rejectFriendRequest);

    // Get user's friends

    router.get("/friends", checkToken, friendship.getFriends)

    app.use("/api", router);
};
