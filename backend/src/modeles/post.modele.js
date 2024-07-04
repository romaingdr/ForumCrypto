const db = require("../utility/config.js");

class ModelePost {
    static createPost(post, res) {
        let sqlQuery = db.format("INSERT INTO posts (id_topic, parent_post_id, user_id, content, created_at) VALUES (?, ?, ?, ?, ?)", [post.id_topic, post.parent_post_id, post.user_id, post.content, post.created_at]);

        db.query(sqlQuery, (err, result) => {
            if (err) {
                console.log("Erreur lors de la création du post : ", err);
                res(true, err);
                return;
            }
            console.log("Post créé");
            res(false, result);
        });
    }

    static getAllPosts(res) {
        let sqlQuery = db.format("SELECT p.*, u.username, u.profile_pic, t.title AS topic_title " +
            "FROM posts p " +
            "INNER JOIN users u ON p.user_id = u.user_id " +
            "INNER JOIN topics t ON p.id_topic = t.id_topic " +
            "ORDER BY p.created_at DESC;");

        db.query(sqlQuery, (err, results) => {
            if (err) {
                return res(true, { error: err.message });
            }
            res(false, results);
        });
    }

    static getPostById(id, res) {
        let sqlQuery = db.format("SELECT p.*, u.username, u.profile_pic, t.title AS topic_title " +
            "FROM posts p " +
            "INNER JOIN users u ON p.user_id = u.user_id " +
            "INNER JOIN topics t ON p.id_topic = t.id_topic " +
            "WHERE p.id_post = ? " +
            "ORDER BY p.created_at DESC;", [id]);

        db.query(sqlQuery, (err, results) => {
            if (err) {
                return res(true, { error: err.message });
            }
            res(false, results);
        });
    }

    static getPostsByTopic(id, res) {
        let sqlQuery = db.format("SELECT p.*, u.username, u.profile_pic, t.title AS topic_title " +
            "FROM posts p " +
            "INNER JOIN users u ON p.user_id = u.user_id " +
            "INNER JOIN topics t ON p.id_topic = t.id_topic " +
            "WHERE p.id_topic = ? " +
            "ORDER BY p.created_at DESC;", [id]);

        db.query(sqlQuery, (err, results) => {
            if (err) {
                return res(true, { error: err.message });
            }
            res(false, results);
        });
    }

    static getPostsByUser(id, res) {
        let sqlQuery = db.format("SELECT p.*, u.username, u.profile_pic, t.title AS topic_title " +
            "FROM posts p " +
            "INNER JOIN users u ON p.user_id = u.user_id " +
            "INNER JOIN topics t ON p.id_topic = t.id_topic " +
            "WHERE p.user_id = ? " +
            "ORDER BY p.created_at DESC;", [id]);

        db.query(sqlQuery, (err, results) => {
            if (err) {
                return res(true, { error: err.message });
            }
            res(false, results);
        });
    }

    static updatePost(post, res) {
        let sqlQuery = db.format("UPDATE posts SET content = ? WHERE id_post = ?", [post.content, post.id_post]);

        db.query(sqlQuery, (err, result) => {
            if (err) {
                console.log("Erreur lors de la mise à jour du post : ", err);
                res(true, err);
                return;
            }
            console.log("Post mis à jour");
            res(false, result);
        });
    }

    static deletePost(id, res) {
        let sqlQuery = db.format("DELETE FROM posts WHERE id_post = ?", [id]);

        db.query(sqlQuery, (err, result) => {
            if (err) {
                console.log("Erreur lors de la suppression du post : ", err);
                res(true, err);
                return;
            }
            console.log("Post supprimé");
            res(false, result);
        });

    }
}

module.exports = ModelePost;