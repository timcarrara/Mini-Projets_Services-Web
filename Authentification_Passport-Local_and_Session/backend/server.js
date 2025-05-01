require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res){
    res.send('Welcome to Passport with Sequelize');
});

// Models
const models = require('./models');
// Routes
const authRoute = require('./routes/auth')(app, passport);

// charger les stratégies passport
require('./config/passport/passport.js')(passport, models.user);

models.sequelize.sync().then(function() {
    console.log('La base de données fonctionne bien');
}).catch(function(err) {
    console.log(err, "Quelque chose s'est mal passé avec la mise à jour de la base de données!")
});

app.listen(3000, function(err) {
    if (!err)
        console.log(`Le serveur écoute sur le port 3000`);
    else console.log(err);
});
