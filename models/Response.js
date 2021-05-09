class Response {
    constructor(id, author, content, comments, files) {
        this.id = id;
        this.author = author;
        this.content = content;
        this.comments = comments;
        this.files = files;
    }

    add_comment(comment) {

    }

    delete_comment(comment) {

    }
}

module.exports = Response;
