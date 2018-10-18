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

socket.on('newLocationMessage', function(message) {
    var li = jQuery('<li></li>');

    // _blank opens url in another new tab
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
    // e is event
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        // acknowledgement
        // sets the value to empty
        messageTextbox.val('');
    });
});


var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        //console.log('position ', position);
        locationButton.removeAttr('disabled').text('Send location');

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

    }, function() {
        locationButton.removeAttr('disabled').text('Send location');;
        alert('Unable to fetch location.');
    });
});