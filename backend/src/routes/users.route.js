module.exports = (app) => {
    const users = require('../controller/users.controller.js');

    let router = require('express').Router();

    router.get('/users', users.getUsers);

    app.use('/api', router);
}