const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require('cors');
const suggestDoctorRoute = require('./routes/suggestDoctorRoute');
const notificationRoute = require('./routes/notificationRoute');
const questionRoute = require('./routes/questions');
const answerRoute = require('./routes/answers');
const insuranceRoute = require('./routes/insurances');
const userinsuranceRoute = require('./routes/userinsurance');

require('./config/passport')(passport);

const DB_URI = require('./config/keys').MONGO_URI;
mongoose
    .connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use("/users", require("./routes/users.js")(passport, jwt));
app.use("/questions",questionRoute);
app.use("/answers",answerRoute);
app.use("/insurance",insuranceRoute);
app.use("/userinsurance",userinsuranceRoute);
app.use("/search", require("./routes/search-doctors.js")());
app.use(suggestDoctorRoute)
app.use(notificationRoute);

app.use('/orderMedicine', require('./routes/orderMedicines.js'));
app.use('/homeCare', require('./routes/homeCare.js'));
const feedbackRoute = require('./routes/feedback.js');
app.use('/', feedbackRoute);
const writeblogRoute = require('./routes/writeblog.js');
app.use('/', writeblogRoute);

app.use('/appointment', require('./routes/appointments'));

app.use("/medical", require('./routes/medical-details.js')());

// Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server running on port ${PORT}`));