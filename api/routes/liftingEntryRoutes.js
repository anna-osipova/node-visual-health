module.exports = function (app) {
    let liftingEntryController = require('../controllers/liftingEntryController');

    app.route('/lifting')
        .get(liftingEntryController.getLiftingEntries);

}
