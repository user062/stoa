const Module = require('./Module');
const connection = require('../config/db');

class ModuleRepository {
    constructor() {
        this.modules = [];
    }

    async init() {
        let module_ids = await connection.query('select ID_MODULE from MODULE;');

        for (const row of module_ids[0])
            this.modules.push(await Module(row.ID_MODULE, '', [], [], ''));
        return this;
    }

    get_module_by_id(id) {
        return this.modules.filter((module) => module.id === id);
    }

    async add_module() {

    }

    get all_posts() {
        return this.modules.reduce((x, y) => x.concat([{ id: y.id, name: y.name, posts: y.posts }]), []);
    }

    get all_modules_informations() {
        return this.modules.reduce((x, y) => x.concat([{ id: y.id, name: y.name }]), []);
    }

    get all_modules() {
        return this.modules;
    }

    get get_all_posts() {
        return this.modules.reduce((x, y) => x.concat(y.posts), []);
    }
}

function createModules() {
    let Modules = new ModuleRepository();
    return Modules.init();
}

module.exports = createModules();
