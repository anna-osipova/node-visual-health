'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: {
        type: String,
        Required: 'Kindly enter a username',
        unique: true
    },
    password: String,
    Created_date: {
        type: Date,
        default: Date.now
    },
});

UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(attemptedPassword, callback) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
            if (err) return reject(err);
            resolve(isMatch);
        });
    });
};

module.exports = mongoose.model('Users', UserSchema);
