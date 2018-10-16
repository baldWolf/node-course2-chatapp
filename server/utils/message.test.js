var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', ()=> {
    it('should generate correct message object', () => {
        var message = generateMessage('Andy@test.com', 'Hi there');
        
        expect(message.from).toBe('Andy@test.com');
        expect(message.text).toBe('Hi there');
        expect(typeof message.createAt).toBe('number');


        var from = message.from;
        var text = message.text;
        expect(message).toMatchObject({from,text});
    
    })
});