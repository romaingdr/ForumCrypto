const db = require("../utility/config.js");

class ModeleFriendRequests {
    static sendFriendRequest(datas, res) {
        let sqlQuery = db.format("INSERT INTO friend_requests (sender_id, receiver_id) VALUES (?, ?)", [datas.id_sender, datas.id_receiver]);

        db.query(sqlQuery, (err, result) => {
            if (err) {
                console.log("Erreur lors de l'envoi de la demande d'ami : ", err);
                res(true, err);
                return;
            }
            console.log("Demande d'ami envoyée");
            res(false, {message: "success"});
        });
    }

    static getFriendStatus(datas, res) {

        console.log(datas);
        let sqlQuery = db.format("SELECT status\n" +
            "        FROM friend_requests\n" +
            "        WHERE (sender_id = ? AND receiver_id = ?)\n" +
            "           OR (sender_id = ? AND receiver_id = ?)", [datas.id_sender, datas.id_receiver, datas.id_receiver, datas.id_sender]);


        db.query(sqlQuery, (err, results) => {
            if (err) {
                return res (true, { error: err.message });
            }

            if (results.length > 0) {
                res(false, { status: results[0].status });
            } else {
                res(false, { status: 'no_request' });
            }
        });
    }

    static getFriendRequests(id, res) {
        let sqlQuery = db.format("SELECT fr.*, u.user_id, u.username, u.profile_pic\n" +
            "        FROM friend_requests fr\n" +
            "        INNER JOIN users u ON fr.sender_id = u.user_id\n" +
            "        WHERE fr.receiver_id = ?", [id]);

        db.query(sqlQuery, (err, results) => {
            if (err) {
                return res(true, { error: err.message });
            }
            res(false, results);
        });
    }

    static acceptFriendRequest(id, res) {
        let sqlQuery = db.format("UPDATE friend_requests SET status = 'accepted' WHERE id = ?", [id]);

        db.query(sqlQuery, (err, results) => {
            if (err) {
                return res(true, { error: err.message });
            }
            res(false, { message: "success" });
        });
    }

    static rejectFriendRequest(id, res) {
        let sqlQuery = db.format("DELETE FROM friend_requests WHERE id = ?", [id]);

        db.query(sqlQuery, (err, results) => {
            if (err) {
                return res(true, { error: err.message });
            }
            res(false, { message: "success" });
        });
    }
}

module.exports = ModeleFriendRequests;
