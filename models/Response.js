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
        this.votes = { 1: [], '-1': [] };
    }

    async init(author_id, comments) {
        let results;

        if (this.id) {
            let results = await connection.query(`select vote, COMPTEID from UP_DOWN_VOTE where ID_REPONSE=${this.id}`);

            for (const row of results[0])
                this.votes[row.vote].push(row.COMPTEID);
        }

        results = await connection.query('select NOM, PRENOM from COMPTE where COMPTEID=?', [author_id]);
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

    async vote(voter, vote) {
        let previous_vote = this.votes[vote * -1].indexOf(voter);
        if (previous_vote !== -1)
            this.votes[vote * -1].splice(previous_vote, 1);
        this.votes[vote].push(voter);
        await connection.query(`insert into UP_DOWN_VOTE values (${this.id}, ${voter}, ${vote}) on duplicate key update vote=${vote}`);
    }

    did_vote(user_id) {
        console.log(this.votes);
        if (this.votes[1].includes(user_id))
            return 1;

        else if (this.votes[-1].includes(user_id))
            return -1;

        return false;
    }

    get vote_count() {
        return this.votes[1].length - this.votes[-1].length;
    }
}

module.exports =
    (id, post_id, creation_date, author_id, content, comments, files) => {
        let response = new Response(id, post_id, creation_date, author_id, content, comments, files);
        return response.init(author_id, comments);
    };
