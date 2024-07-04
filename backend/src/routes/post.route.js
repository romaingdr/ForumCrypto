const post = require("../controller/post.controller");
const checkToken = require('../middleware/checkToken.middleware.js');

module.exports = (app) => {

    let router = require("express").Router();

    // Create a post

    router.post("/post", checkToken, post.createPost);

    // Get all posts

    router.get("/post", post.getAllPosts);

    // Get a post by id

    router.get("/post/:id", post.getPostById);

    // Get posts by topic

    router.get("/post/topic/:id", post.getPostsByTopic);

    // Get posts by user

    router.get("/post/user/:id", post.getPostsByUser);

    // Update a post

    router.put("/post/:id", post.updatePost);

    // Delete a post

    router.delete("/post/:id", post.deletePost);

    // Get user's posts

    router.get("/my-posts", checkToken, post.getMyPosts);

    app.use("/api", router);
};

