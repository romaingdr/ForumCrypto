const db = require("../utility/config.js");

class ModeleUsers {
  static getUsers(res) {
    let sqlQuery = db.format("SELECT * FROM users");

    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.log(err);
        res(true, err);
        return;
      }
      if (result) {
        res(false, result);
        return;
      }
      res(true, {message: "not found"});
    });
  }

  static createUser(user, res) {
    let sqlQuery = db.format("INSERT INTO users SET ?", user);

    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.log("Erreur lors de la création de l'utilisateur : ", err);
        res(true, err);
        return;
      }
      console.log("Utilisateur créé");
      res(false, {message: "success"});
    });
  }

  static loginUser(user, res) {
    let sqlQuery = db.format(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [user.email, user.password]
    );

    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.log("Erreur lors de la connexion de l'utilisateur : ", err);
        res(true, err);
        return;
      }
      if (result.length) {
        console.log("Utilisateur connecté");
        res(false, {message: "success", userId: result[0].user_id, roleId: result[0].id_role});
        return;
      }
      res(true, {message: "not found"});
    });
  }

  static getUserById(id, res) {
    let sqlQuery = db.format("SELECT user_id, username, email, created_at, biography, profile_pic FROM users WHERE user_id = ?", id);

    db.query(sqlQuery, (err, result) => {
          if (err) {
            console.log(err);
            res(true, err);
            return;
          }
          if (result.length) {
            res(false, result);
            return;
          }
          res(true, {message: "not found"});
        });
  }

  static getUserByUsername(username, res) {
    let sqlQuery = db.format("SELECT user_id, username, email, created_at, biography, profile_pic FROM users WHERE username = ?", username);

    db.query(sqlQuery, (err, result) => {
          if (err) {
            console.log(err);
            res(true, err);
            return;
          }
          if (result.length) {
            res(false, result);
            return;
          }
          res(true, {message: "not found"});
        });
  }

  static modifyProfilePicture(userId, filename, callback) {
    let sqlQuery = db.format("UPDATE users SET profile_pic = ? WHERE user_id = ?", [filename, userId]);

    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour de la photo de profil : ", err);
        callback(err, null);
        return;
      }
      console.log("Photo de profil mise à jour");
      callback(null, { message: "success" });
    });
  }

  static search(query, callback) {
    const likeQuery = `%${query}%`;

    const usersQuery = `
        SELECT profile_pic, username
        FROM users
        WHERE username LIKE ?
    `;

    const topicsQuery = `
        SELECT *
        FROM topics
        WHERE title LIKE ?
           OR description LIKE ?
    `;

    const tagsQuery = `
      SELECT tags.*, topics.title AS topic_title, topics.description AS topic_description
      FROM tags
             INNER JOIN topics ON tags.id_topic = topics.id_topic
      WHERE tags.tag_name = ?;
    `;

    db.query(usersQuery, [likeQuery], (errUsers, usersResults) => {
      if (errUsers) {
        console.error("Erreur lors de la requête pour les utilisateurs :", errUsers);
        return callback(errUsers, null);
      }

      db.query(topicsQuery, [likeQuery, likeQuery], (errTopics, topicsResults) => {
        if (errTopics) {
          console.error("Erreur lors de la requête pour les topics :", errTopics);
          return callback(errTopics, null);
        }

        db.query(tagsQuery, [query], (errTags, tagsResults) => {
          if (errTags) {
            console.error("Erreur lors de la requête pour les tags :", errTags);
            return callback(errTags, null);
          }

          const results = {
            users: usersResults,
            topics: topicsResults,
            tags: tagsResults
          };

          callback(null, results);
        });
      });
    });
  }
}

module.exports = ModeleUsers;
