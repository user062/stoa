const connection = require('../config/db');
const Response = require('./Response');
const File = require('./File');
const fs = require('fs');
const elapsed_time = require('./helpers/humanized_time_span');


class Post {
    constructor(id, creation_date, author_id, title, type, content, folders, responses, uploaded_files) {
        this.id = id;
        this.creation_date = new Date(Date.parse(creation_date));
        this.author_id = author_id;
        this.title = title;
        this.type = type;
        this.content = content;
        this.responses = responses;
        this.folders = folders;
        this.files = [];

        connection.query('select NOM, PRENOM from COMPTE where COMPTEID = ?', [author_id]).then((results) => {
            this.author = results[0][0].PRENOM + ' ' + results[0][0].NOM;
        });

        if (responses.length === 0)
            connection.query('select * from REPONSE where POST_ID=?', [this.id]).then((results) => {
                results[0].forEach((row) => { this.responses.push(new Response(row.ID_REPONSE, row.DATE_AJOUTE, row.COMPTEID, row.REPONSE_CORE, [], [])); });
            });

        connection.query('select file_name, file_path from file where POST_ID = ?', [this.id]).then((results) => {
            results[0].forEach((row) => { this.files.push(new File(row.file_name, row.file_path)); });
        });
    }

    async add_file(file) {
        let path = `Uploads/${this.id}/`;
        await connection.query('insert into file (POST_ID, file_path, file_name) values (?,?,?) ', [this.id, path + file.name, file.name]);
        await fs.promises.mkdir('views/' + path, { recursive: true });
        file.mv('views/' + path + file.name);
        this.files.push(new File(file.name, path + file.name));
    }

    add_response(response) {

        let query = 'insert into REPONSE (COMPTEID, POST_ID, REPONSE_CORE) values (?, ?, ?);';

        connection.query(query, [response.author_id, this.id, response.content]).then((results) => {
            connection.query('SELECT LAST_INSERT_ID() as id').then((results) => {
                response.id = results[0][0].id;
            });
        }
        );
        this.responses.push(response);
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
module.exports = Post;
