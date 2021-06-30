const User = require('./User');
const connection = require('../config/db');

class NotificationRepository {
    constructor() {
    }

    async init() {

        return this;
    }

}

function createNotifications() {
    let Notifications = new NotificationRepository();
    return Notifications.init();
}

module.exports = createNotifications();
