const connection = require('../config/db');
const Post = require('./Post');

class Module {
    constructor(id) {
        this.id = id;
        this.name = '';
        this.posts = [];
        this.folders = [];
    }

    async init() {

        let results = await connection.query(`select * from MODULE where MODULE.ID_MODULE=${this.id}`);

        this.name = results[0][0].NOM_MODULE;

        results = await connection.query(`select * from POST P join CONCERNE C on P.POST_ID=C.POST_ID join DOSSIER D on D.ID_DOSSIER=C.ID_DOSSIER join MODULE M on D.ID_MODULE=M.ID_MODULE where M.ID_MODULE=${this.id} group by P.POST_ID`);


        for (const row of results[0]) {
            let post = await Post(row.POST_ID, row.DATE_AJOUTE, row.COMPTEID, row.title, row.TYPE, row.POST_CORE, [], []);
            this.posts.unshift(post);
        };

        results = await connection.query(`select ID_DOSSIER, nom_dossier from DOSSIER where ID_MODULE=${this.id}`);

        for (const row of results[0])
            this.folders.push({ id: row.ID_DOSSIER, name: row.nom_dossier });;

        return this;
    }

    async add_post(post) {
        await post.add_to_db();
        this.posts.unshift(post);
    }

    delete_post(post) {

    }

    async add_folder(folder, folder_creator) {
        let id = await connection.query(`insert into DOSSIER (COMPTEID, ID_MODULE, nom_dossier) values (${folder_creator}, ${this.id}, '${folder}')`);
        this.folders.push({ id: id[0].insertId, name: folder });
    }

    get_post_by_id(id) {
        return this.posts.filter((post) => post.id === id);
    }

    get_posts_by_folder(folder) {
        return this.posts.filter((post) => post.folders.includes(folder));
    }

    get all_folders() {
        return this.folders;
    }
}

let test_module =
    (id, name, posts, folders) => {
        let module = new Module(id);
        return module.init(posts);
    };


module.exports = test_module;
