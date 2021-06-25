const connection = require('../config/db');
const Modules = require('./ModuleRepository');

class User {
    constructor(id, name, family_name, birth_date, gender, status, email) {
        this.id = id;
        this.name = name;
        this.family_name = family_name;
        this.birth_date = birth_date;
        this.gender = gender;
        this.status = status;
        this.email = email;
        this.notifications = [];
        this.modules_taught = [];
        this.subscriptions = [];
        this.notifications = { 'resources': [], 'posts': [], 'reply': [], 'comment': [] };
    }

    async init() {
        if (!this.id)
            return this;

        let results = await connection.query(`select * from COMPTE where COMPTEID=${this.id}`);

        this.family_name = results[0][0].NOM;
        this.name = results[0][0].PRENOM;
        this.birth_date = new Date(results[0][0].DATE_NAISSANCE).toISOString().slice(0, 10);
        this.gender = results[0][0].SEXE;
        this.status = results[0][0].TYPE;
        this.email = results[0][0].EMAIL;
        results = await connection.query(`select ID_MODULE from enseigner where COMPTEID=${this.id}`);

        for (const row of results[0])
            this.modules_taught.push(row.ID_MODULE);

        results = await connection.query(`select ID_MODULE from INSCRIT where COMPTEID=${this.id}`);

        for (const row of results[0])
            this.subscriptions.push(row.ID_MODULE);

        let resources_notif = await connection.query(
            `select * from resources_notifications where COMPTEID = ${this.id}`);

        let modules = await Modules;

        for (const notif of resources_notif[0])
            this.notifications.resources.push({ type: 'resources', id: notif.notification_id, module_id: notif.ID_MODULE, module_name: modules.get_module_by_id(notif.ID_MODULE)[0].name, date: notif.date_ajoute, file_type: notif.type });



        let posts_notif = await connection.query(
            `select * from posts_notifications where COMPTEID = ${this.id}`);

        for (const notif of posts_notif[0])
            this.notifications.posts.push({ type: 'posts', id: notif.notification_id, module_id: notif.ID_MODULE, module_name: modules.get_module_by_id(notif.ID_MODULE)[0].name, date: notif.date_ajoute, post_type: notif.type, post_id: notif.POST_ID });

        let reply_notif = await connection.query(
            `select * from reply_notifications where COMPTEID=${this.id}`);

        for (const notif of reply_notif[0])
            this.notifications.reply.push({ type: 'reply', id: notif.notification_id, module_id: notif.ID_MODULE, module_name: modules.get_module_by_id(notif.ID_MODULE)[0].name, post_id: notif.POST_ID, reply_id: notif.ID_REPONSE, date: notif.date_ajoute });

        let comment_notif = await connection.query(
            `select * from comment_notifications where COMPTEID=${this.id}`);

        for (const notif of comment_notif[0])
            this.notifications.comment.push({ type: 'comment', id: notif.notification_id, module_id: notif.ID_MODULE, module_name: modules.get_module_by_id(notif.ID_MODULE)[0].name, post_id: notif.POST_ID, reply_id: notif.ID_REPONSE, comment_id: notif.ID_COMMENTAIRE, date: notif.date_ajoute });
        return this;
    }

    async add_to_db() {

    }

    async subscribe_to_module(module_id) {
        this.subscriptions.push(module_id);
        await connection.query('insert into INSCRIT (ID_MODULE, COMPTEID) values (?, ?)', module_id, this.id);
    }

    async unsubscribe_to_module(module_id) {
        this.subscriptions.splice(this.subscriptions.indexOf(module_id), 1);
        await connection.query(`delete from INSCRIT where ID_MODULE=${module_id} and COMPTEID=${this.id}`);
    }

    async get_latest_notifications() {
        let modules = await Modules;
        let latest_notifications = { 'resources': [], 'posts': [], 'reply': [], 'comment': [] };

        let current_notif = this.notifications.resources.reduce((max, notif) => max > notif.id ? max : notif.id, 0);

        let resources_notif = await connection.query(
            `select * from resources_notifications where COMPTEID = ${this.id} and notification_id > ${current_notif}`);

        for (const notif of resources_notif[0])
            latest_notifications.resources.push({ type: 'resources', id: notif.notification_id, module_id: notif.ID_MODULE, module_name: modules.get_module_by_id(notif.ID_MODULE)[0].name, date: notif.date_ajoute, file_type: notif.type });

        current_notif = this.notifications.posts.reduce((max, notif) => max > notif.id ? max : notif.id, 0);

        let posts_notif = await connection.query(
            `select * from posts_notifications where COMPTEID = ${this.id} and notification_id > ${current_notif}`);

        for (const notif of posts_notif[0])
            latest_notifications.posts.push({ type: 'posts', id: notif.notification_id, module_id: notif.ID_MODULE, module_name: modules.get_module_by_id(notif.ID_MODULE)[0].name, date: notif.date_ajoute, post_type: notif.type });

        current_notif = this.notifications.reply.reduce((max, notif) => max > notif.id ? max : notif.id, 0);

        let reply_notif = await connection.query(
            `select * from reply_notifications where COMPTEID=${this.id} and notification_id>${current_notif}`);

        for (const notif of reply_notif[0])
            latest_notifications.reply.push({ type: 'reply', id: notif.notification_id, module_id: notif.ID_MODULE, module_name: modules.get_module_by_id(notif.ID_MODULE)[0].name, post_id: notif.POST_ID, reply_id: notif.ID_REPONSE, date: notif.date_ajoute });

        current_notif = this.notifications.comment.reduce((max, notif) => max > notif.id ? max : notif.id, 0);

        let comment_notif = await connection.query(
            `select * from comment_notifications where COMPTEID=${this.id} and notification_id>${current_notif}`);

        for (const notif of comment_notif[0])
            latest_notifications.comment.push({ type: 'comment', id: notif.notification_id, module_id: notif.ID_MODULE, module_name: modules.get_module_by_id(notif.ID_MODULE)[0].name, post_id: notif.POST_ID, reply_id: notif.ID_REPONSE, comment_id: notif.ID_COMMENTAIRE, date: notif.date_ajoute });

        this.notifications.resources = latest_notifications.resources.concat(this.notifications.resources);
        this.notifications.posts = latest_notifications.posts.concat(this.notifications.posts);
        this.notifications.reply = latest_notifications.reply.concat(this.notifications.reply);
        this.notifications.comment = latest_notifications.comment.concat(this.notifications.comment);
        return latest_notifications;
    }

    async delete_notification(id, type) {
        this.notifications[type] = this.notifications[type].filter((notif) => notif.id !== id);
        await connection.query(`delete from ${type}_notifications where notification_id=${id}`);
    }
}

let user =
    (id, name, family_name, birth_date, gender, status, email) => {
        let user = new User(id, name, family_name, birth_date, gender, status, email);
        return user.init();
    };

module.exports = user;
