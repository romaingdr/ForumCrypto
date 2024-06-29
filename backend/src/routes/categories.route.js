const categories = require('../controller/categories.controller');

module.exports = (app) => {

    let router = require("express").Router();

    // Get all categories

    router.get("/categories", categories.getAllCategories);

    // Get category by name

    router.get("/categories/:category", categories.getCategoryByName);

    app.use("/api", router);
};

