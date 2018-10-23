// this is the root of the application
//require('./config.js');

const express = require('express');
var app = express();

const port =  process.env.PORT || 3000;
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users');
var server = http.createServer(app);
var io = socketIO(server);

// configure the static middleware
const publicPath = path.join(__dirname, '../public' );
app.use(express.static(publicPath));

const {generateMessage, generateLocationMessage} = require('./utils/message');

var users = new Users();

// set port number
// app.listen(port, ()=> {
//     console.log(`Start port ${port}`);
// });

io.on('connection', (socket)=> {
    //console.log('New user connected');

    //socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    //socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('join', (params,callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        //socket.leave(string:room);
        // io.emit - emits message to every connected user
        // socket.broadcast.emit - emits message to every connected user execpt the current user
        // socket.emit

        // 
        // io.to(string:room).emit
        // socket.broadcast.to(string:room)
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage( 'Admin', 'New user joined'));
        users.addUsers(socket.id, params.name, params.room);
        
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        
        callback();
    });

    socket.on('createMessage', (message,callback) => {
        //console.log('createMessage', message);
        
        var user = users.getUser(socket.id);

        if ( user  && isRealString(message.text)) {
            //io.emit('newMessage', generateMessage( user.name, message.text));
            io.to(user.room).emit('newMessage', generateMessage( user.name, message.text));
            callback();
        }
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if ( user ) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(
                `${user.name}`, 
                coords.latitude,
                coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        //console.log('User was disconnected');
        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

server.listen(port, ()=> {
    console.log(`Start port ${port}`);
});

// start page
// app.get('/', (req, res) => {
//     res.sendfile('index.html', { root: publicPath } );
// });