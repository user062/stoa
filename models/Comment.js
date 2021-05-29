const connection = require('../config/db');
const elapsed_time = require('./helpers/humanized_time_span');

class Comment {
    constructor(id, creation_date, author_id, content) {
        this.id = id;
        this.creation_date = new Date(Date.parse(creation_date));
        this.author_id = author_id;
        this.content = content;

    }

    async init(author_id) {
        let results = await connection.query('select NOM, PRENOM from COMPTE where COMPTEID=?', [author_id]);
        this.author = results[0][0].PRENOM + ' ' + results[0][0].NOM;
        return this;
    }

    get get_elapsed_time() {
        return elapsed_time(this.creation_date);
    }
}

module.exports =
    (id, creation_date, author_id, content) => {
        let comment = new Comment(id, creation_date, author_id, content);
        return comment.init(author_id);
    };
