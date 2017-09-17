const mongoose = require('mongoose');

const User = mongoose.model('Users');

const {
    sendError,
    ACCESS_DENIED,
    UNAUTHORIZED,
    NOT_FOUND
} = require('./errorController');

exports.createUser = function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, user) {
        if (err) res.send(err);
        res.json(user);
    });
}

exports.login = function(req, res) {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user == null) {
            throw 'Auth failed';
        }

        return user.comparePassword(req.body.password);
    }).then((isMatch) => {
        if (isMatch) {
            req.session.authenticated = true;
            req.session.email = req.body.email;
            res.json({ auth: isMatch });
        } else {
            res.sendStatus(401);
        }
    }).catch((err) => {
        res.json({ error: err });
    });
}

exports.logout = function(req, res) {
    if (!req.session.authenticated) return sendError(UNAUTHORIZED, res);

    req.session.destroy(function(err) {
        if (err == null) {
            res.sendStatus(200);
        } else {
            sendError(err, res);
        }
    });
}

exports.updateUser = function(req, res) {
    User.findOne({ email: req.session.email })
        .then((user) => {
            user.password = req.body.password;
            return user.save();
        })
        .then(() => {
            res.json({ message: 'password updated' });
        })
        .catch((err) => sendError(err, res));
}

exports.deleteUser = function(req, res) {
    User.findOne({ email: req.params.email })
        .then((user) => {
            if (user == null) {
                throw NOT_FOUND;
            }
            if (user.email !== req.session.email) {
                throw ACCESS_DENIED;
            }
            user.remove();
            res.json({ message: 'deleted' })
        }).catch((err) => sendError(err, res));
}

exports.getUsers = function(req, res) {
    User.find({}, function(err, users) {
        res.json(users.map((user) => {
            return {
                email: user.email
            };
        }));
    });
}
