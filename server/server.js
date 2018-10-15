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

    socket.on('disconnect', ()=> {
        console.log('client disconnected');
    });
});

server.listen(port, ()=> {
    console.log(`Start port ${port}`);
});

// start page
// app.get('/', (req, res) => {
//     res.sendfile('index.html', { root: publicPath } );
// });