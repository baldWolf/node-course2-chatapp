// this is the root of the application
require('./config.js');

const express = require('express');
var app = express();
const port =  process.env.PORT;

const path = require('path');
const publicPath = path.join(__dirname, '../public' );

// configure the static middleware
app.use(express.static(publicPath));

// set port number
app.listen(port, ()=> {
    console.log(`Start port ${port}`);
});

// start page
// app.get('/', (req, res) => {
//     res.sendfile('index.html', { root: publicPath } );
// });