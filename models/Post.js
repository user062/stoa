const connection = require('../config/db');
const Response = require('./Response');
const File = require('./File');
const Poll = require('./Poll');
const fs = require('fs');
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

        if (type === 'p') {
            if (!poll_elements)
                this.poll = new Poll(this.id, this.author_id, []);
            else
                this.poll = new Poll(this.id, this.author_id, poll_elements);
        }
    }

    async add_file(file) {
        let location = path.join('Uploads', String(this.id));
        await connection.query('insert into file (POST_ID, file_path, file_name) values (?,?,?) ', [this.id, path.join(location, file.name), file.name]);
        await fs.promises.mkdir(path.join('views', location), { recursive: true });
        file.mv(path.join('views', location, file.name));
        this.files.push(new File(file.name, path.join(location, file.name)));
    }

    async add_response(response) {
        let query = 'insert into REPONSE (COMPTEID, POST_ID, REPONSE_CORE) values (?, ?, ?);';

        await connection.query(query, [response.author_id, this.id, response.content]);
        let id_rep = await connection.query('SELECT ID_REPONSE as id from REPONSE order by id desc limit 1');
        response.id = id_rep[0][0].id;
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
