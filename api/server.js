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

// app.post('/login', async (req, res) => {
// });

// app.get('/register', async (req, res) => {

//   if (!('authorization' in req.headers)) {
//     return res.status(401).send('Authorization header missing')
//   }

//   const token = await req.headers.authorization
//   try {
//     const url = `https://api.github.com/user/${token}`
//     const response = await fetch(url)
//     if (response.ok) {
//       const js = await response.json()
//       // Need camelcase in the frontend
//       const data = Object.assign({}, { avatarUrl: js.avatar_url }, js)
//       return res.status(200).json({ data })
//     } else {
//       // https://github.com/developit/unfetch#caveats
//       const error = new Error(response.statusText)
//       error.response = response
//       throw error
//     }
//   } catch (error) {
//     const { response } = error
//     return response
//       ? res.status(response.status).json({ message: response.statusText })
//       : res.status(400).json({ message: error.message })
//   }
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))