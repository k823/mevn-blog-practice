const mongoose = require('mongoose');
const mongoURI = require('../config/index').mongoURI;

async function connect() {
    try {
        await mongoose.connect(
            mongoURI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
    } catch(err) {
        console.error("Error trying to connect to the database");
        console.log(err);
    }
};

module.exports = { connect };
