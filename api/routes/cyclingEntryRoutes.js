module.exports = function (app) {
    let cyclingEntryContoller = require('../controllers/cyclingEntryController');

    app.route('/cycling')
        .get(cyclingEntryContoller.getCyclingEntries);

};
