exports.findByChallenge = challengeId => new Promise((resolve, reject) => {

    const db = global.database;

    db.query(`SELECT * FROM answers WHERE challenges_id = ${challengeId};`, (error, results) => {

        if (error)
            return reject(error);

        return resolve(results.map(({ id, value }) => ({ id, value })));

    });

});

exports.create = (value, right, challengeId) => new Promise((resolve, reject) => {

    const db = global.database;

    db.query(`INSERT INTO answers (value, \`right\`, challenges_id) VALUES ('${value}', ${right ? 1 : 0}, ${challengeId});`, (error, results) => {

        if (error)
            return reject(error);

        return resolve(results.insertId);

    });

});

exports.findOne = id => new Promise((resolve, reject) => {

    const db = global.database;

    db.query(`SELECT * FROM answers WHERE id = ${id};`, (error, results) => {

        if (error)
            return reject(error);

        return resolve(results[0]);

    });

});
