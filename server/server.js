// this is the root of the application
//require('./config.js');

const express = require('express');
var app = express();

const port =  process.env.PORT || 3000;
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

var server = http.createServer(app);
var io = socketIO(server);

// configure the static middleware
const publicPath = path.join(__dirname, '../public' );
app.use(express.static(publicPath));

const {generateMessage, generateLocationMessage} = require('./utils/message');

// set port number
// app.listen(port, ()=> {
//     console.log(`Start port ${port}`);
// });

io.on('connection', (socket)=> {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message,callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server.');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage(
            'Admin', 
            coords.latitude,
            coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, ()=> {
    console.log(`Start port ${port}`);
});

// start page
// app.get('/', (req, res) => {
//     res.sendfile('index.html', { root: publicPath } );
// });