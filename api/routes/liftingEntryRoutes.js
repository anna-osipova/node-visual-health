module.exports = function (app) {
    const liftingEntryController = require('../controllers/liftingEntryController');

    app.route('/lifting')
        .get(liftingEntryController.getLiftingEntries);

};
