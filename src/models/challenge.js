exports.findAll = () => new Promise((resolve, reject) => {

    const db = global.database;

    db.query('SELECT * FROM challenges;', (error, results) => {

        if (error)
            return reject(error);

        return resolve(results);

    });

});

exports.create = value => new Promise((resolve, reject) => {

    const db = global.database;

    db.query(`INSERT INTO challenges (value) VALUES ('${value}');`, (error, results) => {

        if (error)
            return reject(error);

        return resolve(results.insertId);

    });

});