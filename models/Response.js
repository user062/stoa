const connection = require('../config/db');
const Comment = require('./Comment');
const fs = require('fs');
const File = require('./File');
const elapsed_time = require('./helpers/humanized_time_span');
const path = require('path');

class Response {
    constructor(id, post_id, creation_date, author_id, content, comments, files) {
        this.id = id;
        this.post_id = post_id;
        this.creation_date = new Date(Date.parse(creation_date));
        this.author_id = author_id;
        this.content = content;
        this.comments = comments;
        this.files = files;
    }

    async init(author_id, comments) {

        let results = await connection.query('select NOM, PRENOM from COMPTE where COMPTEID=?', [author_id]);
        this.author = results[0][0].PRENOM + ' ' + results[0][0].NOM;

        if (comments.length === 0) {
            results = await connection.query('select * from COMMENTAIRE where ID_REPONSE=?', [this.id]);

            for (const row of results[0]) {
                let comment = await Comment(row.ID_COMMENTAIRE, row.DATE_AJOUTE, row.COMPTEID, row.COMM_CORE);
                this.comments.push(comment);
            }
        }
        return this;
    }

    async add_to_db(post_id) {
        let query = 'insert into REPONSE (COMPTEID, POST_ID, REPONSE_CORE) values (?, ?, ?);';
        let results = await connection.query(query, [this.author_id, post_id, this.content]);
        this.id = results[0].insertId;
    }

    async add_comment(comment) {
        let query = 'insert into COMMENTAIRE (COMPTEID, ID_REPONSE, COMM_CORE) values (?, ?, ?);';
        let comment_id = await connection.query(query, [comment.author_id, this.id, comment.content]);
        comment.id = comment_id[0].insertId;
        this.comments.push(comment);
    }

    delete_comment(comment) {

    }

    async add_file(file) {
        let location = path.join('Uploads', String(this.post_id), String(this.id));
        let fi = new File(file.name, location);
        await fi.add_to_db(this.id, file);
        this.files.push(fi);
    }

    async add_file(file) {
        let location = path.join('Uploads', String(this.id));
        let fi = new File(file.name, location);
        await fi.add_to_db(this.id, file);
        this.files.push(fi);
    }

    get get_elapsed_time() {
        return elapsed_time(this.creation_date);
    }
}

module.exports =
    (id, post_id, creation_date, author_id, content, comments, files) => {
        let response = new Response(id, post_id, creation_date, author_id, content, comments, files);
        return response.init(author_id, comments);
    };
