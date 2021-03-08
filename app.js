const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const config = require('./config/config');

//conexao banco
const urlDB = config.db;
const optionsDB = {
    poolSize: 5,
    useNewUrlParser: true, 
    useUnifiedTopology: true
};
mongoose.connect(urlDB, optionsDB);
mongoose.set('useCreateIndex', true);

// evento verificar conexao
mongoose.connection.on('error', (err) => {
    console.error('[DB error]: '+ err);
});
mongoose.connection.on('disconnected', () => {
    console.error('[DB error]: No database connection');
});
mongoose.connection.on('connected', () => {
    console.log('[DB]: DB On');
})

//Body-Parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const routeDefault = require('./Routes/default');
const routeUsers   = require('./Routes/users');

app.use('/', routeDefault);
app.use('/user', routeUsers);

app.listen(3000);

module.exports = app;