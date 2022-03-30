const mongoose = require('mongoose');
require('dotenv').config();

// Connects to mongodb database
exports.connect = () => {
    mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to database');
    })
    .catch(err => {
        console.log("Database connection failed. exiting now...");
        console.error(err);
    });
}