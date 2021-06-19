const connection = require('../config/db');
const elapsed_time = require('./helpers/humanized_time_span');

class Comment {
    constructor(id, creation_date, author_id, content, edit_date) {
        this.id = id;
        this.creation_date = new Date(Date.parse(creation_date));
        this.author_id = author_id;
        this.content = content;
        this.edit_date = edit_date;

    }

    async init(author_id) {
        let results = await connection.query('select NOM, PRENOM from COMPTE where COMPTEID=?', [author_id]);
        this.author = results[0][0].PRENOM + ' ' + results[0][0].NOM;
        return this;
    }

    async edit(content) {
        this.edit_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        this.content = content;
        await connection.query('update COMMENTAIRE set COMM_CORE=?, DATE_EDIT=? where ID_COMMENTAIRE=?',
            [content, this.edit_date, this.id]);
    }

    get get_elapsed_time() {
        return elapsed_time(this.creation_date);
    }

    get get_edit_time() {
        return this.edit_date ? new Date(this.edit_date).toISOString().slice(0, 16).replace('T', ' ') : null;
    }
}

module.exports =
    (id, creation_date, author_id, content, edit_date) => {
        let comment = new Comment(id, creation_date, author_id, content, edit_date);
        return comment.init(author_id);
    };
