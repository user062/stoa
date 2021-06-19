const connection = require('../config/db');
const Response = require('./Response');
const File = require('./File');
const Poll = require('./Poll');
const elapsed_time = require('./helpers/humanized_time_span');
const path = require('path');


class Post {
    constructor(id, creation_date, author_id, title, type, content, folders, responses, uploaded_files, poll_elements, edit_date) {
        this.id = id;
        this.creation_date = new Date(Date.parse(creation_date));
        this.author_id = author_id;
        this.title = title;
        this.type = type;
        this.content = content;
        this.responses = responses;
        this.folders = folders;
        this.files = [];
        this.poll_elements = poll_elements;
        this.edit_date = edit_date;
    }

    async init(author_id, responses) {
        if (this.folders.length === 0) {
            let results = await connection.query('select * from DOSSIER D join CONCERNE C on D.ID_DOSSIER=C.ID_DOSSIER where C.POST_ID=?', [this.id]);

            for (const row of results[0])
                this.folders.push({ id: row.ID_DOSSIER, name: row.nom_dossier });
            results = await connection.query('select NOM, PRENOM from COMPTE where COMPTEID = ?', [author_id]);

            this.author = results[0][0].PRENOM + ' ' + results[0][0].NOM;

            if (responses.length === 0) {
                results = await connection.query('select * from REPONSE where POST_ID=?', [this.id]);

                for (const row of results[0]) {
                    let response = await Response(row.ID_REPONSE, this.id, row.DATE_AJOUTE, row.COMPTEID, row.REPONSE_CORE, [], [], row.DATE_EDIT);
                    this.responses.push(response);
                }
            }

            results = await connection.query('select ID_FILE, file_name, file_path from file where POST_ID = ?', [this.id]);

            for (const row of results[0])
                this.files.push(new File(row.file_name, row.file_path, row.ID_FILE));

            if (this.type === 'p')
                this.poll = await Poll(this.id, this.author_id, []);
        }

        return this;
    }


    async add_to_db() {
        let query = 'insert into POST (COMPTEID, title, TYPE, POST_CORE) values (?, ?, ?, ?);';
        let row = await connection.query(query, [this.author_id, this.title, this.type[0], this.content]);
        this.id = row[0].insertId;

        for (const folder of this.folders)
            await connection.query(`insert into CONCERNE (POST_ID, ID_DOSSIER) values (${this.id}, ${folder.id})`);
    }

    async add_file(file) {
        let location = path.join('Uploads', String(this.id));
        let fi = new File(file.name, location);
        await fi.add_to_db(this.id, null, file);
        this.files.push(fi);
    }

    async add_response(response) {
        await response.add_to_db(this.id);
        this.responses.push(response);
    }

    async add_poll() {
        if (!this.poll_elements)
            this.poll = await Poll(this.id, this.author_id, []);
        else
            this.poll = await Poll(this.id, this.author_id, this.poll_elements);
    }

    async edit(folders, title, content, files, old_files) {
        await connection.query(`delete from CONCERNE where POST_ID=${this.id}`);

        for (const folder of folders)
            await connection.query(`insert into CONCERNE (POST_ID, ID_DOSSIER) values (${this.id}, ${folder.id})`);

        this.folders = folders;

        this.edit_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

        await connection.query('update POST set title=?, POST_CORE=?, DATE_EDIT=? where POST_ID=?',
            [title, content, this.edit_date, this.id]);

        for (const file_id of old_files) {
            let fi = this.files.filter(file => file.id === Number(file_id))[0];
            await fi.delete_from_disk_db();
            this.files.splice(this.files.indexOf(fi), 1);
        }

        for (const file of files)
            await this.add_file(file);

    }

    async delete_response(response_id) {
        let files = this.get_response_by_id(response_id)[0].files;
        files = files ? files : [];

        for (const file of files)
            await file.delete_from_disk_db();

        let query = `delete from REPONSE where ID_REPONSE=${response_id}`;
        await connection.query(query);

        this.responses.splice(this.responses.indexOf(this.get_response_by_id(response_id)), 1);
    }

    get_response_by_id(id) {
        return this.responses.filter((response) => response.id === id);
    }

    get get_elapsed_time() {
        return elapsed_time(this.creation_date);
    }

    get get_edit_time() {
        return this.edit_date ? new Date(this.edit_date).toISOString().slice(0, 16).replace('T', ' ') : null;
    }
}

module.exports =
    (id, creation_date, author_id, title, type, content, folders, responses, uploaded_files, poll_elements, edit_date) => {
        let post = new Post(id, creation_date, author_id, title,
            type, content, folders, responses, uploaded_files, poll_elements, edit_date);
        return post.init(author_id, responses);
    };
