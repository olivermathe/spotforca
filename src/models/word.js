
exports.findByCategory = categoryId => new Promise((resolve, reject) => {

    const db = global.database;

    db.query(`SELECT * FROM words WHERE categories_id = ${categoryId};`, (error, results) => {

        if (error)
            return reject(error);

        return resolve(results.map(({ id, name }) => ({ id, name })));

    });

});

exports.create = (name, categoryId) => new Promise((resolve, reject) => {

    const db = global.database;

    db.query(`INSERT INTO words (name, categories_id) VALUES ('${name}', ${categoryId});`, (error, results) => {

        if (error)
            return reject(error);

        return resolve(results.insertId);

    });

});

exports.findOne = id => new Promise((resolve, reject) => {

    const db = global.database;

    db.query(`SELECT * FROM words WHERE id = ${id};`, (error, results) => {

        if (error)
            return reject(error);

        return resolve(results[0]);

    });

});