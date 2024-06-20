const Users = require('../modeles/users.modele');

class ControllerUsers {
    static getUsers = (req, res) => {

        Users.getUsers((err, result) => {
            if (err) {
                if (result.message === "not found") {
                    res.status(404).send({ message: "Aucun utilisateur trouvé" });
                    return;
                }
                res.status(500).send({ message: "Erreur lors de la récupération des utilisateurs" });
                return;
            }
            res.json(result);
        });
    }
}

module.exports = ControllerUsers;