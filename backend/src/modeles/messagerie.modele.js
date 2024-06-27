const db = require('../utility/config.js');

class ModeleMessagerie {
    static getUserConversations(idUser, res) {
        let sqlQuery = db.format(`
        SELECT 
            c.*, 
            CASE
                WHEN c.user1_id = ? THEN c.user2_id
                ELSE c.user1_id
            END AS other_user_id,
            u.profile_pic AS other_user_profile_pic,
            u.username AS other_user_username
        FROM 
            conversation c
        INNER JOIN 
            users u ON u.user_id = CASE WHEN c.user1_id = ? THEN c.user2_id ELSE c.user1_id END
        WHERE 
            c.user1_id = ? OR c.user2_id = ?
    `, [idUser, idUser, idUser, idUser]);

        db.query(sqlQuery, (err, results) => {
            if (err) {
                return res(true, { error: err.message });
            }
            res(false, results);
        });
    }


    static createConversation(idUser, idUser2, res) {
        let sqlQuery = db.format("INSERT INTO conversation (user1_id, user2_id) VALUES (?, ?)", [idUser, idUser2]);

        db.query(sqlQuery, (err, results) => {
            if (err) {
                return res(true, { error: err.message });
            }
            res(false, results);
        });
    }
}

module.exports = ModeleMessagerie;