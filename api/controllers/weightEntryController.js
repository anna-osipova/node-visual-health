const mongoose = require('mongoose');

const WeightEntry = mongoose.model('WeightEntries');

exports.addWeightEntries = function(req, res) {
    if (!req.session.authenticated) return sendError(UNAUTHORIZED, res);

    let addedCount = 0;

    req.body.data.forEach(function(entry) {
        const weightEntry = new WeightEntry({
            value: entry.value,
            date: new Date(entry.startDate),
            username: req.session.username
        });

        weightEntry.save(function(err, weightEntry) {
            if (!err) addedCount++;
        });
    });

    res.json({
        addedCount
    });
}

exports.getWeightEntries = function(req, res) {
    if (!req.session.authenticated) return sendError(UNAUTHORIZED, res);

    WeightEntry.find({ username: req.session.username }, function(err, entries) {
        res.json(entries);
    });
}