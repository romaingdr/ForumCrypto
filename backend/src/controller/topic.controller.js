const Topic = require('../modeles/topic.modele.js');

class ControllerTopic {
    static createTopic = (req, res) => {
        if (!req.body) {
            res.status(400).send({ message: "Le contenu ne peut pas être vide" });
            return;
        }

        const topic = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            created_at: new Date(),
            id_user: res.locals.dataToken.accountId,
            status: req.body.status
        };


        Topic.createTopic(topic, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la création du topic"
                });
                return;
            }
            res.status(201).send({ message: "success" });

        });
    }

    static getAllTopics = (req, res) => {
        Topic.getAllTopics((err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la récupération des topics"
                });
                return;
            }
            res.status(200).send(result);
        });
    }

    static getTopicById = (req, res) => {
        const id = req.params.id;
        Topic.getTopicById(id, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la récupération du topic"
                });
                return;
            }
            res.status(200).send(result);
        });
    }

    static getTopicsByCategory = (req, res) => {
        const category = req.params.category;
        Topic.getTopicsByCategory(category, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la récupération des topics"
                });
                return;
            }
            res.status(200).send(result);
        });
    }

    static getTopicsByUser = (req, res) => {
        const id = req.params.id;
        Topic.getTopicsByUser(id, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la récupération des topics"
                });
                return;
            }
            res.status(200).send(result);
        }
        );
    }

    static deleteTopic = (req, res) => {
        const id = req.params.id;
        Topic.deleteTopic(id, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la suppression du topic"
                });
                return;
            }
            res.status(200).send({ message: "success" });
        });
    }
}

module.exports = ControllerTopic;