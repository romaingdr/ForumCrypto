const categories = require('../controller/categories.controller');

module.exports = (app) => {

    let router = require("express").Router();

    router.get("/categories", categories.getAllCategories);

    app.use("/api", router);
};

