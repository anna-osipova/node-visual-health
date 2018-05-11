const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LiftingEntrySchema = new Schema({
    email: String,
    startDate: Date,
    endDate: Date,
    duration: Number,
    durationUnit: String,
    totalEnergyBurned: Number,
    totalEnergyBurnedUnit: String,
    sourceName: String
}, { collection: 'lifting' });

module.exports = mongoose.model('LiftingEntries', LiftingEntrySchema);
