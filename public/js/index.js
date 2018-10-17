// initiating the request, to open up a web socket
var socket = io();

socket.on('connect', function() {
    console.log('connected to server');

    // testing purposes only
    // socket.emit('createEmail', {
    //     to: 'user@test.com',
    //     text: 'Hi there'
    // });

    // socket.emit('createMessage', {
    //     from: 'Andrew',
    //     text: 'Yup, that works for me'
    // });
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newEmail', function(email) {
    console.log('new email! ', email);
});

socket.on('newMessage', function(message) {
    console.log('new Message ', message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    
    jQuery('#messages').append(li);
});

// testing purposes
// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function(data) {
//     console.log('Got it ', data);
// });


jQuery('#message-form').on('submit', function(e) {
    // e is event
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {
        // acknowledgement
    });
});