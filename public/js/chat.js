// initiating the request, to open up a web socket
var socket = io();

function scrollToBottom() {
    // selectors
    var messages = jQuery('#messages');
    // grabs the last childs
    var newMessage = messages.children('li:last-child');

    // heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if(err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('no error');
        }
    });
});

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
    var formattedTime = moment(message.createAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();

    // console.log('new Message ', message);
    // var formattedTime = moment(message.createAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // li.text(`[${message.from}][${formattedTime}]: ${message.text}`);
    // jQuery('#messages').append(li);
});

// testing purposes
// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function(data) {
//     console.log('Got it ', data);
// });

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createAt).format('h:mm a');

    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();

    // var li = jQuery('<li></li>');

    // _blank opens url in another new tab
    // var a = jQuery('<a target="_blank">My current location</a>');
    // li.text(`[${message.from}][${formattedTime}]: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});


socket.on('updateUserList', function(users) {
    console.log(users);
    var ol = jQuery('<ol></ol>');

    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

jQuery('#message-form').on('submit', function(e) {
    // e is event
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        //from: 'User',
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