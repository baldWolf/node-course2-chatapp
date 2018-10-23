const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'mike',
            room: 'Nodejs'
        },
        {
            id: '2',
            name: 'Rachel',
            room: 'Nodejs'
        }, 
        {
            id: '3',
            name: 'norman',
            room: 'ReactJS'
        }];
    });

    it('should remove user', () => {
        var removedUser = users.removeUser('1');
        //var findUser = users.getUser('1');
        expect(removedUser.id).toBe('1');
        //expect(findUser).toBeFalsy();
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var removedUser = users.removeUser('0');
        expect(removedUser).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var findUser = users.getUser('1');
        expect(findUser).toBeTruthy();
        expect(findUser.id).toBe('1');
    });

    it('should not find user', () => {  
        var findUser = users.getUser('0');
        expect(findUser).toBeFalsy();
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '134',
            name: 'tester',
            room: 'Game fans'
        }

        var resUser = users.addUsers(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Nodejs');
        expect(userList).toEqual(['mike','Rachel']);
    });
});