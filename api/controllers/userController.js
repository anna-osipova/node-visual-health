const mongoose = require('mongoose');

const User = mongoose.model('Users');

const ACCESS_DENIED = 'Access denied';
const UNAUTHORIZED = 'Unauthorized';
const NOT_FOUND = 'User not found';

exports.createUser = function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, user) {
        if (err) res.send(err);
        res.json(user);
    });
}

exports.login = function(req, res) {
    User.findOne({ username: req.body.username }).then((user) => {
        if (user == null) {
            throw 'Auth failed';
        }

        return user.comparePassword(req.body.password);
    }).then((isMatch) => {
        if (isMatch) {
            req.session.authenticated = true;
            req.session.username = req.body.username;
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

//exports.updateUser

exports.deleteUser = function(req, res) {
    User.findOne({ username: req.params.username })
        .then((user) => {
            if (user == null) {
                throw NOT_FOUND;
            }
            if (user.username !== req.session.username) {
                throw ACCESS_DENIED;
            }
            user.remove();
            res.json({ message: 'deleted' })
        }).catch((err) => sendError(err, res));
}

const sendError = function(err, res) {
    switch (err) {
        case ACCESS_DENIED: {
            res.status(403).json({ error: err });
            break;
        }
        case NOT_FOUND:
        default: {
            res.status(500).json({ error: err });
        }
    }
}