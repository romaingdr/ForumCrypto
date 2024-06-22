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
      res(true, { message: "not found" });
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
      res(false, { message: "success" });
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
        res(false, { message: "success" });
        return;
      }
      res(true, { message: "not found" });
    });
  }
}

module.exports = ModeleUsers;
