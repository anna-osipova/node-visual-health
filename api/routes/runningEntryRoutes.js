module.exports = function (app) {
    let runningEntryContoller = require('../controllers/runningEntryController');

    app.route('/running')
        .get(runningEntryContoller.getRunningEntries);

};
