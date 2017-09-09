'use strict';
module.exports = function(app) {
    var userController = require('../controllers/userController');

    app.route('/users')
        .post(userController.createUser)
        .get(userController.getUsers);

    app.route('/login')
        .post(userController.login);

    app.route('/logout')
        .post(userController.logout);

    app.route('/users/:username')
        //.put(userController.updateUser)
        .delete(userController.deleteUser);

}