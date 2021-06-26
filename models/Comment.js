const connection = require('../config/db');
const elapsed_time = require('./helpers/humanized_time_span');

class Comment {
    constructor(id, response_id, author_id, content) {
        this.id = id;
        this.response_id = response_id;
        this.author_id = author_id;
        this.content = content;
    }

    async init() {
        let results;

        if (this.id) {
            let results = await connection.query(`select * from COMMENTAIRE where ID_COMMENTAIRE=${this.id}`);
            this.response_id = results[0][0].ID_REPONSE;
            this.author_id = results[0][0].COMPTEID;
            this.content = results[0][0].COMM_CORE;
            this.creation_date = results[0][0].DATE_AJOUTE;
            this.edit_date = results[0][0].DATE_EDIT;
        }

        results = await connection.query('select NOM, PRENOM from COMPTE where COMPTEID=?', [this.author_id]);
        this.author = results[0][0].PRENOM + ' ' + results[0][0].NOM;

        return this;
    }

    async edit(content) {
        this.edit_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        this.content = content;
        await connection.query('update COMMENTAIRE set COMM_CORE=?, DATE_EDIT=? where ID_COMMENTAIRE=?',
            [content, this.edit_date, this.id]);
    }

    async add_to_db() {
        let query = 'insert into COMMENTAIRE (COMPTEID, ID_REPONSE, COMM_CORE) values (?, ?, ?);';
        let comment_id = await connection.query(query, [this.author_id, this.response_id, this.content]);
        this.id = comment_id[0].insertId;
        this.creation_date = new Date();
    }

    async delete() {
        let query = `delete from COMMENTAIRE where ID_COMMENTAIRE=${this.id}`;
        await connection.query(query);
    }

    get get_edit_time() {
        return this.edit_date ? new Date(this.edit_date).toISOString().slice(0, 16).replace('T', ' ') : null;
    }
}

module.exports =
    (id, response_id, author_id, content) => {
        let comment = new Comment(id, response_id, author_id, content);
        return comment.init();
    };
