const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const dbConnection = async () => {
    await mongoose.connect(process.env.DB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {console.log("db is connected");})
    .catch(err => {console.log(err);})
}

module.exports = () => {
    dbConnection()
}