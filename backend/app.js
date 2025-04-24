require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 5000

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://samsonmathew:pass1@cluster0.xusshfi.mongodb.net/netflix-clone', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
    console.log("Connected to MongoDB");
})

app.listen(port, () => {
    console.log(`API is running on port ${port}`)
})