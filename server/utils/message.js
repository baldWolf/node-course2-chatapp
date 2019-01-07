var moment = require('moment');
var emoji = require('node-emoji')

var generateMessage = (from,message) => {
    let temp = emoji.emojify(message);
    console.log('message is ', temp);
    return {
        from: from,
        text: emoji.emojify(message),
        createAt: moment().valueOf()
    };
};

var generateLocationMessage = (from,latitude,longitude) => {
    return {
        from: from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createAt: moment().valueOf()
    };
};

module.exports = {
    generateMessage,
    generateLocationMessage
}