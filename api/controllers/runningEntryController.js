const mongoose = require('mongoose');

const RunningEntry = mongoose.model('RunningEntries');

const {
    sendError,
    UNAUTHORIZED
} = require('./errorController');

exports.getRunningEntries = function (req, res) {
    if (!req.session.authenticated) return sendError(UNAUTHORIZED, res);

    RunningEntry.find({
        email: req.session.email
    }, function (err, entries) {
        res.json(entries);
    });
};
