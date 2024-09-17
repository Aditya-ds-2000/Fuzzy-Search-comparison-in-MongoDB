const mongoose = require('mongoose');

async function connectToDB() {
    const mongoURI = 'mongodb://localhost:27017/mongoose-fuzzy-test';

    await mongoose.connect(mongoURI).catch((err) => console.error('Error connecting to MongoDB:', err));

    console.log('Successfully connected to MongoDB');
}

module.exports = { connectToDB };
