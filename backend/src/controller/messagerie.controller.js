const Messagerie = require('../modeles/messagerie.modele.js');

class ControllerMessagerie {
    static getUserConversations = (req, res) => {
        const id_user = res.locals.dataToken.accountId
        Messagerie.getUserConversations(id_user, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving conversations."
                });
            } else {
                res.send(data);
            }
        });
    }

    static createConversation = (req, res) => {
        const id_user = res.locals.dataToken.accountId
        const id_user2 = req.body.id_user2
        Messagerie.createConversation(id_user, id_user2, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the conversation."
                });
            } else {
                res.send(data);
            }
        });
    }
}

module.exports = ControllerMessagerie;