const path = require('path');
const fs = require('fs');
const connection = require('../config/db');

class File {
    constructor(name, path) {
        this.name = name;
        this.path = path;
    }

    async add_to_db(post_id, file_object) {
        await connection.query('insert into this (POST_ID, file_path, file_name) values (?,?,?) ', [post_id, path.join(this.path, this.name), this.name]);
        await this.save_to_disk(file_object);
    }

    async save_to_disk(file_object) {
        await fs.promises.mkdir(path.join('views', this.path), { recursive: true });
        file_object.mv(path.join('views', this.path, this.name));
    }
}

module.exports = File;
