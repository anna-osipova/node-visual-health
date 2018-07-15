const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CyclingEntrySchema = new Schema({
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
    collection: 'cycling'
});

module.exports = mongoose.model('CyclingEntries', CyclingEntrySchema);
