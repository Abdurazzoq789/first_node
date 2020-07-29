const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function(){
    mongoose.connect(config.get('db'),{
        useUnifiedTopology: true,
        useNewUrlParser: true, 
        useCreateIndex: true
    })
        .then(() => {
            winston.debug('Mongo db ga ulandi....');
        });
    mongoose.set('useFindAndModify', false);
}