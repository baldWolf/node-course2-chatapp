var moment = require('moment');

var generateMessage = (from,message) => {
    return {
        from: from,
        text: message,
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