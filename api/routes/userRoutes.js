'use strict';
module.exports = function(app) {
    var userController = require('../controllers/userController');

    app.route('/users')
        .get(userController.getUsers);

    app.route('/signup')
        .post(userController.createUser);

    app.route('/login')
        .post(userController.login);

    app.route('/logout')
        .post(userController.logout);

    app.route('/users/:username')
        //.put(userController.updateUser)
        .delete(userController.deleteUser);

}