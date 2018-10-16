var generateMessage = (from,message) => {
    return {
        from: from,
        text: message,
        createAt: new Date().getTime()
    };
};

module.exports = {
    generateMessage
}