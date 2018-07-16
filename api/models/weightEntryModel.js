'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WeightEntrySchema = new Schema({
    value: Number,
    date: Date,
    email: String,
    unit: String,
    source: String
});

WeightEntrySchema.index({ value: 1, date: 1, email: 1 }, { unique: true });

module.exports = mongoose.model('WeightEntries', WeightEntrySchema);
