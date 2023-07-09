const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

function establishDBConnection() {
    return mongoose.connect(process.env.CONNECTION_STRING).then(() => {
        console.log('Connected to the DB');
    }).catch((error) => {
        console.log(error);
    })
}

module.exports = establishDBConnection;