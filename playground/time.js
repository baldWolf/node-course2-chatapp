
var moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());

// var date = moment();
// date.add(100, 'year').subtract(9, 'months');
// console.log(date.format('MMM YYYY'));
// console.log(date.format('hh:mm a'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createAt = 1234;
var date = moment(createAt);
console.log(date.format('h:mm a'));