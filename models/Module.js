class Module {
    constructor(id, name, posts, folders) {
        this.id = id;
        this.name = name;
        this.posts = posts;
        this.folders = folders;
    }

    add_post(post) {

    }

    delete_post(post) {

    }

    add_folder(folder) {

    }
}

class Post {
    constructor(id, author, title, content, responses, folders) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.content = content;
        this.responses = responses;
        this.folders = folders;
    }

    add_response(response) {

    }

    delete_response(response) {

    }
}

class Response {
    constructor(id, author, content, comments) {
        this.id = id;
        this.author = author;
        this.content = content;
        this.comments = comments;
    }

    add_comment(comment) {

    }

    delete_comment(comment) {

    }
}

class Comment {
    constructor(id, author, content) {
        this.id = id;
        this.author = author;
        this.content = content;
    }
}
