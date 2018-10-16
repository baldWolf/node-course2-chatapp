// initiating the request, to open up a web socket
var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

    // testing purposes only
    // socket.emit('createEmail', {
    //     to: 'user@test.com',
    //     text: 'Hi there'
    // });

    socket.emit('createMessage', {
        from: 'Andrew',
        text: 'Yup, that works for me'
    });
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newEmail', function(email) {
    console.log('new email! ', email);
});

socket.on('newMessage', function(message) {
    console.log('new Message ', message);
});