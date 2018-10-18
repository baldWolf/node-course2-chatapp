var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', ()=> {
    it('should generate correct message object', () => {
        var message = generateMessage('Andy@test.com', 'Hi there');
        
        expect(message.from).toBe('Andy@test.com');
        expect(message.text).toBe('Hi there');
        expect(typeof message.createAt).toBe('number');


        var from = message.from;
        var text = message.text;
        expect(message).toMatchObject({from,text});
    
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        
        var from = 'Andy@test.com';
        var url = `https://www.google.com/maps?q=1,1`;
        var message = generateLocationMessage('Andy@test.com',1,1);
        
        expect(message).toMatchObject({from,url});
        expect(typeof message.createAt).toBe('number');
        expect(message.url).toEqual(url);
    });
});