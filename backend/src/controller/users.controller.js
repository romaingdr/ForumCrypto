const Users = require("../modeles/users.modele");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

function createSessionToken(accountId, roleId) {
  const payload = {
    accountId: accountId,
    roleId: roleId,
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
  };

  const token = jwt.sign(payload, 'zbok');
  return token;
}

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
          message: err.message || "Une erreur s'est produite lors de la connexion",
        });
        return;
      }

      console.log("Création du token de session");

      console.log("result : ", result);
      const sessionToken = createSessionToken(result.userId, result.roleId);

      res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.header('Access-Control-Allow-Credentials', 'true');

      res.cookie('cryptolab_session_id', sessionToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
        path: '/'
      });

      console.log("Token de session créé : ", sessionToken);

      res.status(200).send(result);
    });

  };

  static getUserById = (req, res) => {
      let id = res.locals.dataToken.accountId;
      console.log("id : ", id);
      Users.getUserById(id, (err, result) => {
        if (err) {
          if (result.message === "not found") {
            res.status(404).send({message: "Aucun utilisateur trouvé"});
            return;
          }
          res
              .status(500)
              .send({message: "Erreur lors de la récupération de l'utilisateur"});
          return;
        }
        res.json(result);
      });
    }
}

module.exports = ControllerUsers;
