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

// set port number
// app.listen(port, ()=> {
//     console.log(`Start port ${port}`);
// });

io.on('connection', (socket)=> {
    console.log('new user connected!');

    // socket.emit('newEmail', {
    //     from: 'example@test.com',
    //     text: 'This is a greetings.',
    //     createAt: 123
    // });

    // socket.emit('newMessage', {
    //     from: 'Attack',
    //     text: 'See you around',
    //     createAt: 12341234
    // });

    socket.on('disconnect', ()=> {
        console.log('client disconnected');
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        // emits message to all
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });
    });
});

server.listen(port, ()=> {
    console.log(`Start port ${port}`);
});

// start page
// app.get('/', (req, res) => {
//     res.sendfile('index.html', { root: publicPath } );
// });