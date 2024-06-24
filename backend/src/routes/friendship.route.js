const friendship = require("../controller/friendship.controller");

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

    // Reject friend request

    router.delete("/friend_requests/reject/:id", friendship.rejectFriendRequest);

    app.use("/api", router);
};
