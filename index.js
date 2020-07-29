const express = require('express');
const app = express();
const winston = require('winston');
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/prod')(app);

const port = process.env.PORT || 5002;
const server = app.listen(port, () => {
    winston.info(`${port} port bilan ishlahni boshladi`);
});

module.exports = server;