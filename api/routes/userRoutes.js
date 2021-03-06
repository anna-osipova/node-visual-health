module.exports = function(app) {
    const userController = require('../controllers/userController');

    app.route('/users')
        .get(userController.getUsers);

    app.route('/signup')
        .post(userController.createUser);

    app.route('/login')
        .post(userController.login);

    app.route('/token')
        .post(userController.loginWithToken);

    app.route('/logout')
        .post(userController.logout);

    app.route('/users/:username')
        .delete(userController.deleteUser);

    app.route('/users/password')
        .put(userController.updateUser);

};
