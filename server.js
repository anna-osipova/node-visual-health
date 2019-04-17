const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Promise = require('es6-promise').Promise;
const path = require('path');

if (typeof process.env.HEROKU === 'undefined') {
    const config = require('yaml-env-config')('.');
    for (let [key, val] of Object.entries(config.app.env_variables)) {
        process.env[key] = val;
    }
}

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: (origin, callback) => {
        if (['http://localhost:3000', 'https://visual-health.herokuapp.com'].indexOf(origin) > -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

const sessionOptions = {
    secret: 'aauZtiaZ]MBLCHATmgcvtJpWvK2Q4=VW',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 2147483647,
        httpOnly: true,
        path: '/'
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
};
app.use(session(sessionOptions));

app.set('port', process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
    if (!req.session.authenticated) {
        res.status(401);
        return res.send('Not logged in');
    }
    res.send(req.session);
});

app.post('/echo', (req, res) => {
    console.log(req.body);
    res.json({
        message: 'success'
    });
});

require('./api/models/userModel');
const userRoutes = require('./api/routes/userRoutes');
userRoutes(app);

require('./api/models/weightEntryModel');
const weightEntryRoutes = require('./api/routes/weightEntryRoutes');
weightEntryRoutes(app);

require('./api/models/liftingEntryModel');
const liftingEntryRoutes = require('./api/routes/liftingEntryRoutes');
liftingEntryRoutes(app);

require('./api/models/cyclingEntryModel');
const cyclingEntryRoutes = require('./api/routes/cyclingEntryRoutes');
cyclingEntryRoutes(app);

require('./api/models/runningEntryModel');
const runningEntryRoutes = require('./api/routes/runningEntryRoutes');
runningEntryRoutes(app);

const uriString = process.env.MONGODB_URI;

mongoose.Promise = Promise;
mongoose.connect(uriString, function (err) {
    if (err) {
        console.error(`ERROR connecting to MongoDB: ${err}`);
    } else {
        console.info('Succeeded connected to MongoDB');
    }
});

app.listen(app.get('port'), function () {
    console.info('Node app is running on port', app.get('port'));
});
