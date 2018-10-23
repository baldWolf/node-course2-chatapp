const expect = require('expect');
var {isRealString} = require('./validation.js');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var testString = isRealString(1234);
        expect( testString ).toBeFalsy();
    });

    it('should reject string with only spaces', () => {
        var testString = isRealString('    ');
        expect( testString ).toBeFalsy();
    });

    it('should allow string with non-space characters', () => {
        var testString = isRealString('   abc1234   ');
        expect( testString ).toBeTruthy();
    });
});