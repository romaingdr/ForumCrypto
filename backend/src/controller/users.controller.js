const Users = require("../modeles/users.modele");
const crypto = require("crypto");

class ControllerUsers {
  static getUsers = (req, res) => {
    Users.getUsers((err, result) => {
      if (err) {
        if (result.message === "not found") {
          res.status(404).send({ message: "Aucun utilisateur trouvé" });
          return;
        }
        res
          .status(500)
          .send({ message: "Erreur lors de la récupération des utilisateurs" });
        return;
      }
      res.json(result);
    });
  };

  static createUser = (req, res) => {
    if (!req.body) {
      res.status(400).send({ message: "Le contenu ne peut pas être vide" });
      return;
    }

    const userPassword = req.body.password;
    const hashedPassword = crypto
      .createHash("sha512")
      .update(userPassword)
      .digest("hex");

    const user = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      created_at: new Date(),
      biography: null,
      last_connected: null,
      profile_pic: "default_pic.jpg",
      id_role: 2,
    };

    Users.createUser(user, (err, result) => {
      if (err) {
        res.status(500).send({
          message:
            err.message ||
            "Une erreur s'est produite lors de la création de l'utilisateur",
        });
        return;
      }
      res.status(201).send(result);
    });
  };

  static loginUser = (req, res) => {
    if (!req.body) {
      res.status(400).send({ message: "Le contenu ne peut pas être vide" });
      return;
    }

    const userPassword = req.body.password;
    const hashedPassword = crypto
      .createHash("sha512")
      .update(userPassword)
      .digest("hex");

    const user = {
      email: req.body.email,
      password: hashedPassword,
    };

    Users.loginUser(user, (err, result) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite lors de la connexion",
        });
        return;
      }
      res.status(200).send(result);
    });
  };
}

module.exports = ControllerUsers;
