
exports.findByCategory = categoryId => new Promise((resolve, reject) => {

    const db = global.database;

    db.query(`SELECT * FROM words WHERE categories_id = ${categoryId};`, (error, results) => {

        if (error)
            return reject(error);

        return resolve(results.map(({ id, name }) => ({ id, name })));

    });

});