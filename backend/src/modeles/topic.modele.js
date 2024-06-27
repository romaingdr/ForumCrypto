const db = require("../utility/config.js");

class ModeleTopic {
    static createTopic(topic, res) {
        let sqlQuery = db.format("INSERT INTO topics (title, description, id_category, user_id, created_at, status) VALUES (?, ?, ?, ?, ?, ?)", [topic.title, topic.description, topic.category, topic.id_user, topic.created_at, topic.status]);

        db.query(sqlQuery, (err, result) => {
            if (err) {
                console.log("Erreur lors de la création du topic : ", err);
                res(true, err);
                return;
            }
            console.log("Topic créé");
            res(false, result);
        });
    }

    static addTags(id, tags, res) {
        let sqlQuery = db.format("INSERT INTO tags (id_topic, tag_name) VALUES ?", [tags.map(tag => [id, tag])]);

        db.query(sqlQuery, (err, result) => {
            if (err) {
                console.log("Erreur lors de l'ajout des tags : ", err);
                res(true, err);
                return;
            }
            console.log("Tags ajoutés");
            res(false, result);
        });
    }

    static getAllTopics(res) {
        let sqlQuery = db.format("SELECT t.*, u.username, u.profile_pic, c.title AS category_title, " +
            "GROUP_CONCAT(g.tag_name SEPARATOR ', ') AS tags " +
            "FROM topics t " +
            "INNER JOIN users u ON t.user_id = u.user_id " +
            "INNER JOIN categories c ON t.id_category = c.id_category " +
            "LEFT JOIN tags g ON t.id_topic = g.id_topic " +
            "GROUP BY t.id_topic " +
            "ORDER BY t.created_at DESC;");

        db.query(sqlQuery, (err, results) => {
            if (err) {
                return res(true, { error: err.message });
            }
            res(false, results);
        });
    }

    static getTopicById(id, res) {
        let sqlQuery = db.format("SELECT t.*, u.username, u.profile_pic\n" +
            "        FROM topics t\n" +
            "        INNER JOIN users u ON t.id_user = u.user_id\n" +
            "        WHERE t.id = ?", [id]);

        db.query(sqlQuery, (err, results) => {
            if (err) {
                return res(true, { error: err.message });
            }
            res(false, results);
        });
    }


    static getTopicsByCategory(category, res) {
        let sqlQuery = db.format("SELECT t.*, u.username, u.profile_pic\n" +
            "        FROM topics t\n" +
            "        INNER JOIN users u ON t.id_user = u.user_id\n" +
            "        WHERE t.id_category = ?\n" +
            "        ORDER BY t.created_at DESC", [category]);

        db.query(sqlQuery, (err, results) => {
            if (err) {
                return res(true, { error: err.message });
            }
            res(false, results);
        });
    }
}

module.exports = ModeleTopic;