require('express-async-errors');
require('winston-mongodb');
const winston = require('winston');

module.exports = function(){
    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.File({ filename: 'logs/vd-logs.log'}) );
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/virtualdars-logs'}));
    winston.exceptions.handle(new winston.transports.Console(), new winston.transports.File({ filename: 'logs/vd-logs.log'}))
    process.on('unhandledRejection', ex => {
        throw ex;
    });
}