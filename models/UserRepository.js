const User = require('./User');
const connection = require('../config/db');

class UserRepository {
    constructor() {
        this.users = [];
    }

    async init() {
        let user_ids = await connection.query('select COMPTEID from COMPTE;');

        for (const row of user_ids[0])
            this.users.push(await User(row.COMPTEID));

        return this;
    }

    get_user_by_id(id) {
        return this.users.filter((user) => user.id === id);
    }

    get all_users() {
        return this.users;
    }

    add_user(user) {
        this.users.push(user);
    }

}

function createusers() {
    let Users = new UserRepository();
    return Users.init();
}

module.exports = createusers();
