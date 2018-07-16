module.exports = function (app) {
    const weightEntryController = require('../controllers/weightEntryController');

    app.route('/weight')
        .post(weightEntryController.addWeightEntries)
        .get(weightEntryController.getWeightEntries);

    app.route('/weight/workflow')
        .post(weightEntryController.addWorkflowWeightEntries);

};
