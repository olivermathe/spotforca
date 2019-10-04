
exports.findAll = () => new Promise((resolve, reject) => {

    const db = global.database;

    db.query('SELECT * FROM categories;', (error, results) => {

        if (error)
            return reject(error);

        return resolve(results);

    });

});

exports.create = name => new Promise((resolve, reject) => {

    const db = global.database;

    db.query(`INSERT INTO categories (name) VALUES ('${name}');`, (error, results) => {

        if (error)
            return reject(error);

        return resolve(results.insertId);

    });

})