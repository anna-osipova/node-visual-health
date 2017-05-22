const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const nconf = require('nconf');
nconf.argv().env().file('keys.json');

const Promise = require('es6-promise').Promise;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const sessionOptions = {
    secret: 'aauZtiaZ]MBLCHATmgcvtJpWvK2Q4=VW',
    saveUninitialized: false,
    resave: false,
    //cookie: { maxAge: 360000, secure: false },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
};
app.use(session(sessionOptions));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    if(!req.session.authenticated) {
        res.status(401);
        return res.send('Not logged in');
    }
    res.send(req.session);
});

var User = require('./api/models/userModel');
var userRoutes = require('./api/routes/userRoutes');
userRoutes(app);

const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');
const db = nconf.get('mongoDatabase');
const uriString = `mongodb://${user}:${pass}@${host}:${port}/${db}`;

mongoose.Promise = Promise;
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
