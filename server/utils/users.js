[{
    id: '/#12piajfjowjef',
    name: 'Andrew',
    room: 'the office fans'
}]

class Users {
    constructor() {
        this.users = [];
    }

    addUsers(id,name,room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        // var removedUser;
        // var tempUsers = this.users.filter((user) => {
        //     if ( user.id === id ) {
        //         removedUser = user;
        //     } else {
        //         return user.id != id;
        //     }
        // })

        // this.users = tempUsers;
        // return removedUser;

        var user = this.getUser(id);

        if (user ) {
            // creates a new array
            this.users = this.users.filter((user) => user.id !== id);
        } 
        
        return user;
    }

    getUser(id) {
        // var users = this.users.filter((user) => user.id === id );
        // if(users && users.length > 0) {
        //     return users[0];
        // }
        // return undefined;

        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name );
        return namesArray;
    }
}

module.exports = {
    Users
};