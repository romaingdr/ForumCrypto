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

    static addFriend(requestId, res) {
        const getRequestQuery = 'SELECT sender_id, receiver_id FROM friend_requests WHERE id = ?';

        db.query(getRequestQuery, [requestId], (err, result) => {
            if (err) {
                console.log("Erreur lors de la récupération de la demande d'ami : ", err);
                res(true, err);
                return;
            }

            if (result.length === 0) {
                console.log("Demande d'ami non trouvée ou non acceptée");
                res(true, {message: "Friend request not found or not accepted"});
                return;
            }

            const senderId = result[0].sender_id;
            const receiverId = result[0].receiver_id;

            // Deuxième requête pour insérer les relations d'amitié dans la table friends
            const insertFriendQuery = 'INSERT INTO friends (user_id, friend_id, created_at) VALUES (?, ?, CURRENT_TIMESTAMP), (?, ?, CURRENT_TIMESTAMP)';

            db.query(insertFriendQuery, [senderId, receiverId, receiverId, senderId], (err, result) => {
                if (err) {
                    console.log("Erreur lors de l'ajout de l'ami : ", err);
                    res(true, err);
                    return;
                }

                console.log("Ami ajouté");
                res(false, {message: "success"});
            });
        });
    }

    static getFriends(id, res) {
        let sqlQuery = db.format("SELECT fr.*, u.user_id, u.username, u.profile_pic\n" +
            "        FROM friends fr\n" +
            "        INNER JOIN users u ON fr.friend_id = u.user_id\n" +
            "        WHERE fr.user_id = ?", [id]);

        db.query(sqlQuery, (err, results) => {
            if (err) {
                return res(true, { error: err.message });
            }
            res(false, results);
        });
    }
}

module.exports = ModeleFriendRequests;
