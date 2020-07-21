const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require('cors');

require('./config/passport')(passport);

const DB_URI = require('./config/keys').MONGO_URI;
mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error(err))

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", require("./routes/users.js")(passport, jwt));

// Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 8080
app.listen(PORT, console.log(`Server running on port ${PORT}`));