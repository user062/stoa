const connection = require('../config/db');
const Post = require('./Post');
const path = require('path');
const Document = require('./Document');

class Module {
    constructor(id, name, profs, description) {
        this.id = id;
        this.name = name;
        this.posts = [];
        this.folders = [];
        this.description = description;
        this.documents = { 'course': [], 'td': [], 'hw': [] };
        this.profs = profs ? profs : [];
    }

    async init() {
        if (this.id) {
            let results = await connection.query(`select * from MODULE where MODULE.ID_MODULE=${this.id}`);

            this.name = results[0][0].NOM_MODULE;
            this.description = results[0][0].description ? results[0][0].description : '';

            results = await connection.query(`select P.POST_ID from POST P join CONCERNE C on P.POST_ID=C.POST_ID join DOSSIER D on D.ID_DOSSIER=C.ID_DOSSIER join MODULE M on D.ID_MODULE=M.ID_MODULE where M.ID_MODULE=${this.id} group by P.POST_ID`);

            for (const row of results[0]) {
                let post = await Post(row.POST_ID);
                this.posts.unshift(post);
            };

            results = await connection.query(`select ID_DOSSIER, nom_dossier from DOSSIER where ID_MODULE=${this.id}`);

            for (const row of results[0])
                this.folders.push({ id: row.ID_DOSSIER, name: row.nom_dossier });;

            results = await connection.query('select * from DOCUMENT where ID_MODULE = ?', [this.id]);

            for (const row of results[0]) {
                if (row.type === 'c')
                    this.documents.course.push(new Document(row.NOM, row.path, row.ID_DOCUMENT, 'course'));
                else if (row.type === 't')
                    this.documents.td.push(new Document(row.NOM, row.path, row.ID_DOCUMENT, 'td'));
                else
                    this.documents.hw.push(new Document(row.NOM, row.path, row.ID_DOCUMENT, 'hw'));
            }

            results = await connection.query(`select COMPTEID from enseigner where ID_MODULE=${this.id}`);

            for (const row of results[0])
                this.profs.push(row.COMPTEID);
        }

        return this;
    }

    async add_to_db() {
        let results = await connection.query(`insert into MODULE (NOM_MODULE) values ('${this.name}')`);
        this.id = results[0].insertId;
        console.log(this.id);

        for (const prof of this.profs)
            await connection.query(`insert into enseigner (ID_MODULE, COMPTEID) values (${this.id}, ${prof})`);
    }

    async add_post(post) {
        await post.add_to_db();
        this.posts.unshift(post);
    }

    async add_prof(prof_id) {
        await connection.query(`insert into enseigner (ID_MODULE, COMPTEID) values (${this.id}, ${prof_id})`);
        this.profs.unshift(prof_id);
    }

    async remove_prof(prof_id) {
        await connection.query(`delete from enseigner where ID_MODULE=${this.id} and COMPTEID=${prof_id}`);
        console.log(this.profs);
        this.profs.splice(this.profs.indexOf(prof_id), 1);
        console.log(this.profs);
    }

    async delete_post(post_id) {
        let post = this.get_post_by_id(post_id)[0];
        await post.delete();
        this.posts.splice(this.posts.indexOf(post), 1);
    }

    async add_folder(folder, folder_creator) {
        let id = await connection.query(`insert into DOSSIER (COMPTEID, ID_MODULE, nom_dossier) values (${folder_creator}, ${this.id}, '${folder}')`);
        this.folders.push({ id: id[0].insertId, name: folder });
    }

    async add_document(file, type) {
        let location = path.join('Uploads', 'Modules', String(this.id), type);
        let fi = new Document(file.name, location, null, type);
        await fi.add_to_db(this.id, type[0], file);
        this.documents[type].push(fi);
        return fi;
    }

    async delete_document(file_id) {
        let type = 'course';
        let file = this.documents[type].filter((file) => file.id === file_id)[0];

        if (!file) {
            type = 'td';
            file = this.documents[type].filter((file) => file.id === file_id)[0];
            if (!file) {
                type = 'hw';
                file = this.documents[type].filter((file) => file.id === file_id)[0];
            }
        }

        await file.delete_from_disk_db();
        this.documents[type].splice(this.documents[type].indexOf(file), 1);
    }

    async edit_description(content) {
        this.description = content;
        await connection.query(`update MODULE set description='${content}' where ID_MODULE=${this.id}`);
    }

    get_post_by_id(id) {
        return this.posts.filter((post) => post.id === id);
    }

    get_posts_by_folder(folder) {
        return this.posts.filter((post) => post.folders.filter(post_folder => post_folder.id === folder)[0]);
    }

    get all_folders() {
        return this.folders;
    }
}

let test_module =
    (id, name, profs, description) => {
        let module = new Module(id, name, profs, description);
        return module.init();
    };


module.exports = test_module;
