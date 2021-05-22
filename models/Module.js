const connection = require('../config/db');
const Post = require('./Post');

class Module {
    constructor(id, name, posts, folders) {
        this.id = id;
        this.name = name;
        this.posts = posts;
        this.folders = folders;
        if (posts.length === 0)
            connection.query('select * from POST').then((rows) => {
                rows[0].forEach((row) => { this.posts.unshift(new Post(row.POST_ID, row.DATE_AJOUTE, row.COMPTEID, row.title, row.TYPE, row.POST_CORE, [], [])); });
            });
    }

    async add_post(post) {
        let query = 'insert into POST (COMPTEID, title, TYPE, POST_CORE) values (?, ?, ?, ?);';
        console.log(post.type[0]);
        await connection.query(query, [post.author_id, post.title, post.type[0], post.content]);
        let row = await connection.query('SELECT POST_ID AS id FROM POST ORDER BY id DESC LIMIT 1');
        post.id = row[0][0].id;
        this.posts.unshift(post);
    }

    delete_post(post) {

    }

    add_folder(folder) {
        this.folders.push(folder);

    }

    get_post_by_id(id) {
        return this.posts.filter((post) => post.id === id);
    }
}

let test_module = new Module(null, "ACOO", [], ['devoirs', 'coures', 'td', 'notes', 'other']);

module.exports = test_module;
/*
    let resps = [
        [new Response('john blow hmidat', "this is response 1 from blow"),
        new Response('john blow kader', "this is response 2 from blow"),
        new Response('john blow dja3fer', "this is response 3 from blow")],

        [new Response('casey muratori', "this is a response from casey"),
        new Response('senior dev', "this is a response from a dev"),
        new Response('prof', "this is a response from prof")],

        [new Response('alan turin', "this is a response from turing"),
        new Response('boyce', "this is a response from a boyce"),
        new Response('codd', "this is a response from codd")]
    ];

    let posts = [
        new Post('1', 'djamel moubahli9', "question about unity", "this is Q1", resps[0]),
        new Post('2', 'idriss moubahli9', "question about openBSD", "this is Q2", resps[1]),
        new Post('3', 'abdou japan expret', "question about compiler", "this is Q3", resps[2])
    ];
    */
