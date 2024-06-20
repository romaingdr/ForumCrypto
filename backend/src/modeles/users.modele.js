const db = require('../utility/config.js');

class ModeleUsers {
    static getUsers(res) {

        let sqlQuery = db.format("SELECT * FROM users");

        db.query(sqlQuery, (err, result) => {
            if (err) {
                console.log(err)
                res(true, err);
                return;
            }
            if (result) {
                res(false, result);
                return;
            }
            res(true, { message: "not found" });
        });
    }
}

module.exports = ModeleUsers;