const mongoose = require('mongoose');

const LiftingEntry = mongoose.model('LiftingEntries');

const {
    sendError,
    UNAUTHORIZED
} = require('./errorController');

exports.getLiftingEntries = function (req, res) {
    if (!req.session.authenticated) return sendError(UNAUTHORIZED, res);

    LiftingEntry.find({
        email: req.session.email
    }, function (err, entries) {
        res.json(entries);
    });
};
