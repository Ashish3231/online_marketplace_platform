const express = require('express');
const cors = require('cors');
const session = require('express-session');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

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
const db = require('./app/models');

db.sequelize.sync();

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to online market place application.' });
});

// routes
require('./app/routes/auth.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
