const db = require('../utility/config.js');

class ModeleCategories {
    static getAllCategories(res) {
        let sqlQuery = db.format("SELECT * FROM categories");

        db.query(sqlQuery, (err, results) => {
            if (err) {
                return res(true, { error: err.message });
            }
            res(false, results);
        });
    }
}

module.exports = ModeleCategories;