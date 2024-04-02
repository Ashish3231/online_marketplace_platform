const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { parseDBError } = require('./app/util/utility');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  next();
});

// Add session middleware
app.use(
  session({
    secret: 'your_secret_key', // Change this to a secret string
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400 * 1000, // 24 hours in milliseconds
    },
  }),
);

// database
// Database sync
const db = require('./app/models');

db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    const errData = parseDBError(err);
    console.log('Failed to sync db: ' + errData.message);
  });

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to online market place application.' });
});

//routing
app.use('/', require('./app/routes'));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
