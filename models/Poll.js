const connection = require('../config/db');

class Poll {
    constructor(id, author, elements) {
        this.id = id;
        this.author = author;
        this.elements = elements;

        if (elements.length === 0) {
            connection.query(`select COMPTEID, pe.POLL_ID, POST_ID, ELEMENT from POLL_ELEMENT pe join POLL_VOTE pv
on pv.POLL_ID = pe.POLL_ID where POST_ID=?;`, this.id).then((result) => {

                result[0].forEach((row) => {
                    if (this.elements[row.POLL_ID])
                        this.elements[row.POLL_ID].push(row.COMPTEID);
                    else
                        this.elements[row.POLL_ID] = [];
                }
                );
            }
            );
        }
        else {
            this.elements.forEach((element) => {
                connection.query('insert into POLL_ELEMENT (POST_ID, ELEMENT) values (?, ?);',
                    this.id, element).then((result) => {
                        connection('select POLL_ID from POLL_ELEMENT where POST_ID=? and ELEMENT=?', this.id, element).then(
                            (result) => { this.elements[result[0][0].POLL_ID] = []; });
                    });
            }
            );
        }
    }

    async vote(element_id, voter) {
        this.elements[element_id].push(voter);
        let query = 'insert into poll_vote (POLL_ID, COMPTEID) values (?, ?);';
        await connection.query(query, element_id, voter);
    }

    did_vote(user_id) {
        for (const element of this.elements)
            if (user_id in this.elements[element])
                return true;
        return false;
    }
}

module.exports = Poll;
