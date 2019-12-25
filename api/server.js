const express = require('express');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/auth.route');
const config = require('./config/keys.dev');
require('./middleware/passport')(passport);
const firebase = require('firebase');

firebase.initializeApp(config.firebaseConfig);

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
const port = 3001;


app.use('/auth', authRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))