const connection = require('../config/db');
const elapsed_time = require('./helpers/humanized_time_span');

class Note {
    constructor(id, creation_date, author_id, title, content, folders) {
        this.id = id;
        this.creation_date = new Date(Date.parse(creation_date));
        this.author_id = author_id;
        this.title = title;
        this.content = content;
        this.folders = folders;

        connection.query('select NOM, PRENOM from COMPTE where COMPTEID = ?', [author_id]).then((results) => {
            this.author = results[0][0].PRENOM + ' ' + results[0][0].NOM;
        });

    }

    get get_elapsed_time() {
        return elapsed_time(this.creation_date);
    }
}
module.exports = Note;;
