const connection = require('../config/db');
const Comment = require('./Comment');
const File = require('./File');
const elapsed_time = require('./helpers/humanized_time_span');
const path = require('path');

class Response {
    constructor(id, post_id, author_id, content) {
        this.id = id;
        this.post_id = post_id;
        this.author_id = author_id;
        this.content = content;
        this.comments = [];
        this.files = [];
        this.votes = { 1: [], '-1': [] };
    }

    async init() {
        let results;

        if (this.id) {
            results = await connection.query(`select * from REPONSE where ID_REPONSE=${this.id}`);
            this.post_id = results[0][0].POST_ID;
            this.creation_date = results[0][0].DATE_AJOUTE;
            this.author_id = results[0][0].COMPTEID;
            this.content = results[0][0].REPONSE_CORE;
            this.edit_date = results[0][0].DATE_EDIT;

            results = await connection.query(`select vote, COMPTEID from UP_DOWN_VOTE where ID_REPONSE=${this.id}`);

            for (const row of results[0])
                this.votes[row.vote].push(row.COMPTEID);

            results = await connection.query('select ID_COMMENTAIRE from COMMENTAIRE where ID_REPONSE=?', [this.id]);

            for (const row of results[0]) {
                let comment = await Comment(row.ID_COMMENTAIRE);
                this.comments.push(comment);
            }

            results = await connection.query('select ID_FILE, file_name, file_path from file where ID_REPONSE = ?', [this.id]);

            for (const row of results[0])
                this.files.push(new File(row.file_name, row.file_path, row.ID_FILE));
        }

        results = await connection.query('select NOM, PRENOM from COMPTE where COMPTEID=?', [this.author_id]);

        if (results[0][0])
            this.author = results[0][0].PRENOM + ' ' + results[0][0].NOM;

        return this;
    }

    async add_to_db(post_id) {
        let query = 'insert into REPONSE (COMPTEID, POST_ID, REPONSE_CORE) values (?, ?, ?);';
        let results = await connection.query(query, [this.author_id, post_id, this.content]);
        this.id = results[0].insertId;
        this.creation_date = new Date();
    }

    async add_comment(comment) {
        await comment.add_to_db();
        this.comments.push(comment);
    }

    async delete_comment(comment_id) {
        let comment = this.get_comment_by_id(comment_id)[0];
        await comment.delete();
        this.comments.splice(this.comments.indexOf(comment), 1);
    }

    async add_file(file) {
        let location = path.join('Uploads', String(this.post_id), String(this.id));
        let fi = new File(file.name, location);
        await fi.add_to_db(null, this.id, file);
        this.files.push(fi);
    }

    async delete() {
        let files = this.files;
        files = files ? files : [];

        for (const file of files)
            await file.delete_from_disk_db();

        for (const comment of this.comments)
            await this.delete_comment(comment.id);

        let query = `delete from REPONSE where ID_REPONSE=${this.id}`;
        await connection.query(query);
    }

    async vote(voter, vote) {
        let maybe_vote = this.votes[vote].indexOf(voter);

        if (this.votes[vote].indexOf(voter) !== -1) {
            await connection.query(`delete from UP_DOWN_VOTE where ID_REPONSE=${this.id} and COMPTEID=${voter}`);
            this.votes[vote].splice(maybe_vote, 1);
        }

        else {
            let previous_vote = this.votes[vote * -1].indexOf(voter);
            if (previous_vote !== -1)
                this.votes[vote * -1].splice(previous_vote, 1);
            this.votes[vote].push(voter);
            await connection.query(`insert into UP_DOWN_VOTE values (${this.id}, ${voter}, ${vote}) on duplicate key update vote=${vote}`);
        }
    }

    did_vote(user_id) {
        if (this.votes[1].includes(user_id))
            return 1;

        else if (this.votes[-1].includes(user_id))
            return -1;

        return false;
    }

    async edit(content, files, old_files) {
        this.edit_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        this.content = content;
        await connection.query('update REPONSE set REPONSE_CORE=?, DATE_EDIT=? where ID_REPONSE=?',
            [content, this.edit_date, this.id]);

        for (const file_id of old_files) {
            let fi = this.files.filter(file => file.id === Number(file_id))[0];
            await fi.delete_from_disk_db();
            this.files.splice(this.files.indexOf(fi), 1);
        }

        for (const file of files)
            await this.add_file(file);

    }

    get_comment_by_id(id) {
        return this.comments.filter((comment) => comment.id === id);
    }

    get get_elapsed_time() {
        return elapsed_time(this.creation_date);
    }

    get vote_count() {
        return this.votes[1].length - this.votes[-1].length;
    }

    get get_edit_time() {
        return this.edit_date ? new Date(this.edit_date).toISOString().slice(0, 16).replace('T', ' ') : null;
    }
}

module.exports =
    (id, post_id, author_id, content) => {
        let response = new Response(id, post_id, author_id, content);
        return response.init(author_id);
    };
