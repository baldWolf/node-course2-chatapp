var generateMessage = (from,message) => {
    return {
        from: from,
        text: message,
        createAt: new Date().getTime()
    };
};

var generateLocationMessage = (from,latitude,longitude) => {
    return {
        from: from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createAt: new Date().getTime()
    };
};

module.exports = {
    generateMessage,
    generateLocationMessage
}