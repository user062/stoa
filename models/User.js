const connection = require('../config/db');

class User {
    constructor(id, name, family_name, birth_date, gender, status, email) {
        this.id = id;
        this.name = name;
        this.family_name = family_name;
        this.birth_date = birth_date;
        this.gender = gender;
        this.status = status;
        this.email = email;
    }

    async init() {
        if (!this.id)
            return this;

        let results = await connection.query(`select * from COMPTE where COMPTEID=${this.id}`);

        this.family_name = results[0][0].NOM;
        this.name = results[0][0].PRENOM;
        this.birth_date = new Date(results[0][0].DATE_NAISSANCE).toISOString().slice(0, 10);
        this.gender = results[0][0].SEXE;
        this.status = results[0][0].TYPE;
        this.email = results[0][0].EMAIL;
        this.modules_taught = [];

        results = await connection.query(`select * from COMPTE c join enseigner m on c.COMPTEID=m.COMPTEID where c.COMPTEID=${this.id} group by c.COMPTEID`);

        for (const row of results[0])
            this.modules_taught.push(row.ID_MODULE);

        return this;
    }

    async add_to_db() {

    }
}

let user =
    (id, name, family_name, birth_date, gender, status, email) => {
        let user = new User(id, name, family_name, birth_date, gender, status, email);
        return user.init();
    };

module.exports = user;
