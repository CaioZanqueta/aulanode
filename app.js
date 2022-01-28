const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/config');

const url = config.bd_string;

mongoose.connect(url);

mongoose.connection.on('error', (err) => {
  console.log('Erro na conexão com o banco de dados: ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Aplicação desconectada do bando de dados!');
});

mongoose.connection.on('connected', () => {
  console.log('Aplicação conectada ao bando de dados!');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;