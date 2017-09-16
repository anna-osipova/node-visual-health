'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var WeightEntrySchema = new Schema({
    value: {
        type: Number,
    },
    date: {
        type: Date
    },
    email: {
        type: String
    }
});

WeightEntrySchema.index({ value: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('WeightEntries', WeightEntrySchema);