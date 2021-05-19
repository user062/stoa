const connection = require('../config/db');
const Comment = require('./Comment');
const fs = require('fs');
const File = require('./File');
const elapsed_time = require('./helpers/humanized_time_span');
const path = require('path');

class Response {
    constructor(id, creation_date, author_id, content, comments, files) {
        this.id = id;
        this.creation_date = new Date(Date.parse(creation_date));
        this.author_id = author_id;
        this.content = content;
        this.comments = comments;
        this.files = files;

        connection.query('select NOM, PRENOM from COMPTE where COMPTEID=?', [author_id]).then((results) => {
            this.author = results[0][0].PRENOM + ' ' + results[0][0].NOM;
        });

        if (comments.length === 0)
            connection.query('select * from COMMENTAIRE where ID_REPONSE=?', [this.id]).then((results) => {
                results[0].forEach((row) => { this.comments.push(new Comment(row.ID_Commentaire, row.DATE_AJOUTE, row.COMPTEID, row.COMM_CORE, [], [])); });
            });
    }


    add_comment(comment) {
        let query = 'insert into COMMENTAIRE (COMPTEID, ID_REPONSE, COMM_CORE) values (?, ?, ?);';

        connection.query(query, [comment.author_id, this.id, comment.content]).then((results) => {
            connection.query('SELECT LAST_INSERT_ID() as id').then((results) => {
                comment.id = results[0][0].id;
                this.comments.push(comment);
            });
        });
    }

    delete_comment(comment) {

    }

    async add_file(file) {
        let post_id = await connection.query('select POST_ID from REPONSE where ID_REPONSE=?', [this.id]);
        let location = path.join('Uploads', String(post_id[0][0].POST_ID), String(this.id));
        await connection.query('insert into file (ID_REPONSE, file_path, file_name) values (?,?,?) ', [this.id, path.join(location, file.name), file.name]);
        await fs.promises.mkdir(path.join('views', location), { recursive: true });
        file.mv(path.join('views', location, file.name));
        this.files.push(new File(file.name, path.join(location, file.name)));
    }

    get get_elapsed_time() {
        return elapsed_time(this.creation_date);
    }
}

module.exports = Response;
