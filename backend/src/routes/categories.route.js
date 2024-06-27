const categories = require('../controller/categories.controller');

module.exports = (app) => {

    let router = require("express").Router();

    // Get all categories

    router.get("/categories", categories.getAllCategories);

    app.use("/api", router);
};

