const connection = require('../config/db');

class Poll {
    constructor(id, author, elements) {
        this.id = id;
        this.author = author;
        this.vote_choices = [];
        this.elements = {};
        this.vote_choices = [];
        this.elements_ids = [];

        if (elements.length === 0)
            connection.query(`select ELEMENT, POLL_ID from POLL_ELEMENT where POST_ID=${this.id}`).then(async (results) => {
                results[0].forEach((row) => {
                    this.vote_choices.push(row.ELEMENT);
                    this.elements[row.POLL_ID] = [];
                });
                this.elements_ids = Array.from(Array(Object.keys(this.elements).length).keys());

                connection.query('select COMPTEID, pe.POLL_ID from POLL_ELEMENT pe join POLL_VOTE pv on pv.POLL_ID = pe.POLL_ID where POST_ID=?;', this.id).then((result) => {

                    result[0].forEach((row) => {
                        this.elements[row.POLL_ID].push(row.COMPTEID);
                    }
                    );
                }
                );
            }
            );

        else {
            elements = elements.map((element) => {
                this.vote_choices.push(element); return `(${this.id}, '${element}')`;
            }).join();

            connection.query(`insert into POLL_ELEMENT (POST_ID, ELEMENT) values ${elements};`).then((result) => {
                connection.query(`select POLL_ID from POLL_ELEMENT where POST_ID=${this.id}`).then((result) => {
                    result[0].forEach((row) => { this.elements[row.POLL_ID] = []; });
                    this.elements_ids = Array.from(Array(Object.keys(this.elements).length).keys());
                }
                );
            });
        }
    }

    async vote(element_ind, voter) {
        let previous_vote = this.did_vote(voter);
        if (Number.isInteger(previous_vote)) {
            let ind = this.elements[Object.keys(this.elements)[previous_vote]].indexOf(voter);
            this.elements[Object.keys(this.elements)[previous_vote]].splice(ind, 1);
        }

        this.elements[Object.keys(this.elements)[element_ind]].push(voter);
        let query = `call P1(${voter}, ${Number(Object.keys(this.elements)[element_ind])}, ${this.id})`;
        await connection.query(query);

    }

    did_vote(user_id) {
        for (const ind of this.elements_ids) {
            if (this.elements[Object.keys(this.elements)[ind]].includes(user_id)) {
                return ind;
            }
        }
        return false;
    }

    get poll_representation() {
        let repr = {
            id: this.id,
            choices: this.vote_choices,
            pollCount: Object.values(this.elements).reduce((x, y) => x + y.length, 0),
            votes: Object.keys(this.elements).length > 0 ? Object.values(this.elements).map((x) => x.length) : this.vote_choices.map((x) => 0)
        };
        repr.stringify = JSON.stringify(repr);
        return repr;
    }
}

module.exports = Poll;
