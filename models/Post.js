const connection = require('../config/db');
const Response = require('./Response');
const File = require('./File');
const Poll = require('./Poll');
const elapsed_time = require('./helpers/humanized_time_span');
const path = require('path');


class Post {
    constructor(id, author_id, title, type, content, folders) {
        this.id = id;
        this.author_id = author_id;
        this.title = title;
        this.type = type;
        this.content = content;
        this.responses = [];
        this.folders = folders ? folders : [];
        this.files = [];
    }

    async init() {
        let results;

        if (this.id) {
            results = await connection.query(`select * from POST where POST_ID=${this.id}`);

            for (const row of results[0]) {
                this.creation_date = row.DATE_AJOUTE;
                this.author_id = row.COMPTEID;
                this.title = row.title;
                this.type = row.TYPE;
                this.content = row.POST_CORE;
                this.creation_date = new Date(Date.parse(row.DATE_AJOUTE));
                this.edit_date = row.DATE_EDIT;
            }

            results = await connection.query('select * from DOSSIER D join CONCERNE C on D.ID_DOSSIER=C.ID_DOSSIER where C.POST_ID=?', [this.id]);

            for (const row of results[0])
                this.folders.push({ id: row.ID_DOSSIER, name: row.nom_dossier });


            results = await connection.query('select * from REPONSE where POST_ID=?', [this.id]);

            for (const row of results[0]) {
                let response = await Response(row.ID_REPONSE);
                this.responses.push(response);
            }

            results = await connection.query('select * from file where POST_ID = ?', [this.id]);

            for (const row of results[0])
                this.files.push(new File(row.file_name, row.file_path, row.ID_FILE));

            if (this.type === 'p')
                this.poll = await Poll(this.id, this.author_id, []);
        }

        results = await connection.query('select NOM, PRENOM from COMPTE where COMPTEID = ?', [this.author_id]);

        if (results[0][0])
            this.author = results[0][0].PRENOM + ' ' + results[0][0].NOM;

        return this;
    }


    async add_to_db() {
        let query = 'insert into POST (COMPTEID, title, TYPE, POST_CORE) values (?, ?, ?, ?);';
        let row = await connection.query(query, [this.author_id, this.title, this.type[0], this.content]);
        this.id = row[0].insertId;
        this.creation_date = new Date();

        for (const folder of this.folders) {
            console.log(this.author_id);
            console.log(this.id);
            console.log(folder.id);
            await connection.query(`insert into CONCERNE (POST_ID, ID_DOSSIER) values (${this.id}, ${folder.id})`);

        }
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
        let response = this.get_response_by_id(response_id)[0];
        await response.delete();
        this.responses.splice(this.responses.indexOf(response), 1);
    }

    async delete() {
        let files = this.files;
        files = files ? files : [];

        for (const file of files)
            await file.delete_from_disk_db();

        for (const response of this.responses)
            await this.delete_response(response.id);

        let query = `delete from POST where POST_ID=${this.id}`;
        await connection.query(query);
    }

    get_response_by_id(id) {
        return this.responses.filter((response) => response.id === id);
    }

    get get_edit_time() {
        return this.edit_date ? new Date(this.edit_date).toISOString().slice(0, 16).replace('T', ' ') : null;
    }
}

module.exports =
    (id, author_id, title, type, content, folders) => {
        let post = new Post(id, author_id, title, type, content, folders);
        return post.init();
    };
