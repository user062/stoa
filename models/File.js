const path = require('path');
const fs = require('fs');
const connection = require('../config/db');

class File {
    constructor(name, path, id) {
        this.id = id;
        this.name = name;
        this.path = path;
    }

    async add_to_db(post_id, reply_id, file_object) {
        let fi;

        if (post_id)
            fi = await connection.query('insert into file (POST_ID, file_path, file_name) values (?,?,?) ',
                [post_id, this.path, this.name]);
        else
            fi = await connection.query('insert into file (ID_REPONSE, file_path, file_name) values (?,?,?) ',
                [reply_id, this.path, this.name]);

        await this.save_to_disk(file_object);
        this.id = fi[0].insertId;
    }

    async save_to_disk(file_object) {
        await fs.promises.mkdir(path.join('views', this.path), { recursive: true });
        file_object.mv(path.join('views', this.path, this.name));
    }

    async delete_from_disk_db() {
        await connection.query(`delete from file where ID_FILE=${this.id}`);
        await fs.promises.unlink(path.join('views', this.path, this.name));
    }

    get file_location() {
        return path.join(this.path, this.name);
    }

    async file_blob() {
        return await fs.promises.readFile(path.join('views', this.path, this.name));

    }
}

module.exports = File;
