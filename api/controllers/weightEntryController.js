const mongoose = require('mongoose');

const WeightEntry = mongoose.model('WeightEntries');

const {
    sendError,
    UNAUTHORIZED
} = require('./errorController');

exports.addWeightEntries = async function (req, res) {
    if (!req.session.authenticated) return sendError(UNAUTHORIZED, res);

    let addedCount = 0;
    let errorCount = 0;

    await Promise.all(req.body.data.map(function (entry) {
        const weightEntry = new WeightEntry({
            value: entry.value,
            date: new Date(entry.startDate),
            username: req.session.email
        });

        return weightEntry.save()
            .then(() => {
                addedCount++;
            }).catch((err) => {
                if (err.name === 'MongoError' && err.code === 11000) {
                    return;
                }
                errorCount++;
                console.error(err);
            });
    }));

    res.json({
        addedCount,
        errorCount
    });
};

exports.addWorkflowWeightEntries = async function (req, res) {
    const data = JSON.parse(req.body.data).items;

    let addedCount = 0;
    let errorCount = 0;

    await Promise.all(data.map((entry) => {
        const weightEntry = new WeightEntry({
            value: entry.value,
            date: new Date(entry.date),
            // TODO: session handling with workflow
            // username: req.session.email,
            username: req.header('User-email'),
            unit: entry.unit,
            source: entry.source
        });

        return weightEntry.save()
            .then(() => {
                addedCount++;
            }).catch((err) => {
                if (err.name === 'MongoError' && err.code === 11000) {
                    return;
                }
                errorCount++;
                console.error(err);
            });
    }));

    res.json({
        addedCount,
        errorCount
    });
};

exports.getWeightEntries = function (req, res) {
    if (!req.session.authenticated) return sendError(UNAUTHORIZED, res);

    WeightEntry.find({
        email: req.session.email
    }, function (err, entries) {
        res.json(entries);
    });
};
