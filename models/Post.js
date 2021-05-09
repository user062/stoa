const connection = require('../config/db');
const Response = require('./Response');

class Post {
    constructor(id, author, title, type, content, folders, responses) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.type = type;
        this.content = content;
        this.responses = responses;
        this.folders = folders;
        if (responses.length === 0)
            connection.query('select * from REPONSE where POST_ID=?', [this.id], (err, results) => {
                if (err)
                    throw err;
                else
                    results.forEach((row) => { this.responses.unshift(new Response(row.ID_REPONSE, row.COMPTEID, row.REPONSE_CORE, [], [])); });
            });
    }

    add_response(response) {

        let query = 'insert into REPONSE (COMPTEID, POST_ID, REPONSE_CORE) values (?, ?, ?);';

        connection.query(query, [response.author, this.id, response.content], (err, results) => {
            if (err)
                throw err;

            else {
                connection.query('SELECT LAST_INSERT_ID() as id', (err, results) => {
                    response.id = results[0].id;
                });
            }
        });
        this.responses.unshift(response);
    }

    delete_response(response) {

    }
}
module.exports = Post;
