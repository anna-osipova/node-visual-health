const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RunningEntrySchema = new Schema({
    email: String,
    startDate: Date,
    endDate: Date,
    totalDistance: Number,
    totalDistanceUnit: String,
    duration: Number,
    durationUnit: String,
    totalEnergyBurned: Number,
    totalEnergyBurnedUnit: String,
    sourceName: String
}, {
    collection: 'running'
});

module.exports = mongoose.model('RunningEntries', RunningEntrySchema);
