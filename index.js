var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.send("hello");
});

var uriString =
    process.env.MONGODB_URI ||
    'mongodb://localhost/HelloMongoose';

mongoose.connect(uriString, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uriString + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uriString);
    }
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
