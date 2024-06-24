const FriendRequests = require("../modeles/friendship.modele");


class ControllerFriendRequests {

    static sendFriendRequest = (req, res) => {
        if (!req.body) {
            res.status(400).send({ message: "Le contenu ne peut pas être vide" });
            return;
        }

        const friendRequest = {
            id_sender: req.body.id_sender,
            id_receiver: req.body.id_receiver,
        };

        FriendRequests.sendFriendRequest(friendRequest, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                    err.message ||
                    "Une erreur s'est produite lors de l'envoi de la demande d'ami"
                });
                return;
            }
            res.status(201).send({ message: "success" });
        });
    }

    static getFriendStatus = (req, res) => {


        const friendRequest = {
            id_sender: req.params.id_sender,
            id_receiver: req.params.id_receiver,
        };

        FriendRequests.getFriendStatus(friendRequest, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                    err.message ||
                    "Une erreur s'est produite lors de la récupération du statut de la demande d'ami"
                });
                return;
            }
            res.status(200).send(result);
        });
    }

    static getFriendRequests = (req, res) => {
        const id = req.params.id;
        FriendRequests.getFriendRequests(id, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                    err.message ||
                    "Une erreur s'est produite lors de la récupération des demandes d'ami"
                });
                return;
            }
            res.status(200).send(result);
        });
    }

    static acceptFriendRequest = (req, res) => {
        const id = req.params.id;
        FriendRequests.acceptFriendRequest(id, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                    err.message ||
                    "Une erreur s'est produite lors de l'acceptation de la demande d'ami"
                });
                return;
            }
            res.status(200).send(result);
        });
    }

    static rejectFriendRequest = (req, res) => {
        const id = req.params.id;
        FriendRequests.rejectFriendRequest(id, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                    err.message ||
                    "Une erreur s'est produite lors du rejet de la demande d'ami"
                });
                return;
            }
            res.status(200).send(result);
        });
    }

    static addFriend = (req, res) => {
        const requestId = req.params.id;

        FriendRequests.addFriend(requestId, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                    err.message ||
                    "Une erreur s'est produite lors de l'ajout de l'ami"
                });
                return;
            }
            res.status(201).send({ message: "success" });
        });
    }

    static getFriends = (req, res) => {
        const id = req.params.id;

        FriendRequests.getFriends(id, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message ||
                        "Une erreur s'est produite lors de la récupération des amis"
                });
                return;
            }
            res.status(200).send(result);
        });
    }
}

module.exports = ControllerFriendRequests;
