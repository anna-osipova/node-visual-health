'use strict';
module.exports = function(app) {
    let weightEntryController = require('../controllers/weightEntryController');

    app.route('/weight')
        .post(weightEntryController.addWeightEntries)
        .get(weightEntryController.getWeightEntries);

}