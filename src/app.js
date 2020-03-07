const express = require('express');
const cors = require('cors');
const { appConfig } = require('./config');
const api = require('./routes/api');

const app = express();

//  Settings
app.set('port', appConfig.port);

//  Middlewares
app.use(cors({
    credentials: true,
    origin: [
        'https://coreinventory.herokuapp.com'
    ]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  Routes
app.get('/', (req, res) => res.send('Welcome to Core Inventory API'));
app.use('/api', api);

module.exports = app;