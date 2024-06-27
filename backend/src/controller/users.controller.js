const Users = require("../modeles/users.modele");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../assets/img/profile_pics'));
  },
  filename: function(req, file, cb) {
    const uniqueFileName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueFileName);
  }
});

const upload = multer({ storage: storage }).single('file');

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
          res.status(404).send({message: "Aucun utilisateur trouvé"});
          return;
        }
        res
            .status(500)
            .send({message: "Erreur lors de la récupération des utilisateurs"});
        return;
      }
      res.json(result);
    });
  };

  static createUser = (req, res) => {
    if (!req.body) {
      res.status(400).send({message: "Le contenu ne peut pas être vide"});
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
      res.status(400).send({message: "Le contenu ne peut pas être vide"});
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


      const sessionToken = createSessionToken(result.userId, result.roleId);

      res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.header('Access-Control-Allow-Credentials', 'true');

      res.cookie('cryptolab_session_id', sessionToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
        path: '/'
      });

      res.status(200).send(result);
    });

  };

  static getUserById = (req, res) => {
    let id = res.locals.dataToken.accountId;
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

  static getUserByUsername = (req, res) => {
    let username = req.params.username;

    Users.getUserByUsername(username, (err, result) => {
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

  static modifyProfilePicture(req, res) {

    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: "Erreur lors du téléchargement du fichier" });
      } else if (err) {
        return res.status(500).json({ message: "Une erreur est survenue lors du traitement du fichier" });
      }

      const userId = res.locals.dataToken.accountId;
      const filename = req.file.filename;

      Users.modifyProfilePicture(userId, filename, (err, result) => {
        if (err) {
          if (result && result.message === "not found") {
            return res.status(404).json({ message: "Aucun utilisateur trouvé" });
          }
          return res.status(500).json({ message: "Erreur lors de la mise à jour de l'image de profil" });
        }
        return res.json(result);
      });
    });
  }
}

module.exports = ControllerUsers;
