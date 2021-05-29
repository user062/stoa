const connection = require('../config/db');
const Response = require('./Response');
const File = require('./File');
const Poll = require('./Poll');
const elapsed_time = require('./helpers/humanized_time_span');
const path = require('path');


class Post {
    constructor(id, creation_date, author_id, title, type, content, folders, responses, uploaded_files, poll_elements) {
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

    }

    async init(author_id, responses) {

        let results = await connection.query('select NOM, PRENOM from COMPTE where COMPTEID = ?', [author_id]);
        this.author = results[0][0].PRENOM + ' ' + results[0][0].NOM;

        if (responses.length === 0) {
            results = await connection.query('select * from REPONSE where POST_ID=?', [this.id]);

            for (const row of results[0]) {
                let response = await Response(row.ID_REPONSE, this.id, row.DATE_AJOUTE, row.COMPTEID, row.REPONSE_CORE, [], []);
                this.responses.push(response);
            }
        }

        results = await connection.query('select file_name, file_path from file where POST_ID = ?', [this.id]);

        for (const row of results[0])
            this.files.push(new File(row.file_name, row.file_path));

        if (this.type === 'p')
            if (!this.poll_elements)
                this.poll = await Poll(this.id, this.author_id, []);
            else
                this.poll = await Poll(this.id, this.author_id, this.poll_elements);

        return this;
    }


    async add_to_db() {
        let query = 'insert into POST (COMPTEID, title, TYPE, POST_CORE) values (?, ?, ?, ?);';
        let row = await connection.query(query, [this.author_id, this.title, this.type[0], this.content]);
        this.id = row[0].insertId;
    }

    async add_file(file) {
        let location = path.join('Uploads', String(this.id));
        let fi = new File(file.name, location);
        await fi.add_to_db(this.id, file);
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

    delete_response(response) {

    }

    get_response_by_id(id) {
        return this.responses.filter((response) => response.id === id);
    }

    get get_elapsed_time() {
        return elapsed_time(this.creation_date);
    }
}

module.exports =
    (id, creation_date, author_id, title, type, content, folders, responses, uploaded_files, poll_elements) => {
        let post = new Post(id, creation_date, author_id, title,
            type, content, folders, responses, uploaded_files, poll_elements);
        return post.init(author_id, responses);
    };
