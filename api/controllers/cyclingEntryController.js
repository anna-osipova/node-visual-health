const mongoose = require('mongoose');

const CyclingEntry = mongoose.model('CyclingEntries');

const {
    sendError,
    UNAUTHORIZED
} = require('./errorController');

exports.getCyclingEntries = function (req, res) {
    if (!req.session.authenticated) return sendError(UNAUTHORIZED, res);

    CyclingEntry.find({
        email: req.session.email
    }, function (err, entries) {
        res.json(entries);
    });
};
