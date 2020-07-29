const config = require('config');

module.exports = function(){
    if(!config.get('jwtPrivateKey')){
        throw new Error('JIDDIY XATO: virtualdars_jwtPrivateKey muhi o\'zgaruvchisi aniqlanmagan.');
    }
}