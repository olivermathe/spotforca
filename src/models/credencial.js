exports.findCurrent = () => new Promise((resolve, reject) => {

    const db = global.database;

    db.query(`SELECT * FROM credencials WHERE isValid = ${true} and userId = 1;`, (error, results) => {

        if (error)
            return reject(error);

        return resolve(results[0]);

    });

});

exports.setToInvalid = id => new Promise((resolve, reject) => {

    const db = global.database;

    db.query(`UPDATE credencials SET isValid = false WHERE id = ${id};`, (error, results) => {

        if (error)
            return reject(error);

        return resolve(results.affectedRows);

    });

});

exports.create = authorization => new Promise((resolve, reject) => {

    const db = global.database;

    db.query(`INSERT INTO credencials (authorization, userId) VALUES ('${authorization}', 1);`, (error, results) => {

        if (error)
            return reject(error);

        return resolve(results.insertId);

    });

});