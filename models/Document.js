const path = require('path');
const fs = require('fs');
const connection = require('../config/db');

class Document {
    constructor(name, path, id, type) {
        this.id = id;
        this.name = name;
        this.path = path;
    }

    async add_to_db(module_id, type, file_object) {
        let fi;
        fi = await connection.query('insert into DOCUMENT (ID_MODULE, NOM, path, type) values (?,?,?,?) ',
            [module_id, this.name, this.path, type]);

        await this.save_to_disk(file_object);
        this.id = fi[0].insertId;
    }

    async save_to_disk(file_object) {
        await fs.promises.mkdir(path.join('views', this.path), { recursive: true });
        file_object.mv(path.join('views', this.path, this.name));
    }

    async delete_from_disk_db() {
        await connection.query(`delete from DOCUMENT where ID_DOCUMENT=${this.id}`);
        await fs.promises.unlink(path.join('views', this.path, this.name));
    }

    get file_location() {
        return path.join(this.path, this.name);
    }

    async file_blob() {
        return await fs.promises.readFile(path.join('views', this.path, this.name));

    }
}

module.exports = Document;
