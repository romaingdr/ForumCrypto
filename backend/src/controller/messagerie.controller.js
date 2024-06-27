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

    static getConversationMessages = (req, res) => {
        const conversation_id = req.params.conversationId
        Messagerie.getConversationMessages(conversation_id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving messages."
                });
            } else {
                res.send(data);
            }
        });
    }

    static sendMessage = (req, res) => {
        const conversation_id = req.params.conversationId
        const id_user = res.locals.dataToken.accountId
        const content = req.body.content
        Messagerie.sendMessage(conversation_id, id_user, content, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occurred while sending the message."
                });
            } else {
                res.send(data);
            }
        });
    }
}

module.exports = ControllerMessagerie;