const Post = require('../modeles/post.modele.js');

class ControllerPost {
    static createPost = (req, res) => {
        if (!req.body) {
            res.status(400).send({ message: "Le contenu ne peut pas être vide" });
            return;
        }

        const post = {
            id_topic: req.body.id_topic,
            parent_post_id: req.body.parent_post_id,
            user_id: res.locals.dataToken.accountId,
            content: req.body.content,
            created_at: new Date(),


        };

        Post.createPost(post, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la création du post"
                });
                return;
            }
            res.status(201).send(result);

        });
    }

    static getAllPosts = (req, res) => {
        Post.getAllPosts((err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la récupération des posts"
                });
                return;
            }
            res.status(200).send(result);
        });
    }

    static getPostById = (req, res) => {
        const id = req.params.id;
        Post.getPostById(id, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la récupération du post"
                });
                return;
            }
            res.status(200).send(result);
        });
    }

    static getPostsByTopic = (req, res) => {
        const id = req.params.id;
        Post.getPostsByTopic(id, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la récupération des posts"
                });
                return;
            }
            res.status(200).send(result);
        });
    }

    static getPostsByUser = (req, res) => {
        const id = req.params.id;
        Post.getPostsByUser(id, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la récupération des posts"
                });
                return;
            }
            res.status(200).send(result);
        });
    }

    static updatePost = (req, res) => {
        const id = req.params.id;
        const post = {
            content: req.body.content,
            updated_at: new Date()
        };
        Post.updatePost(id, post, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la mise à jour du post"
                });
                return;
            }
            res.status(200).send(result);
        });
    }

    static deletePost = (req, res) => {
        const id = req.params.id;
        Post.deletePost(id, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la suppression du post"
                });
                return;
            }
            res.status(200).send(result);
        });
    }

    static getMyPosts = (req, res) => {
        const id = res.locals.dataToken.accountId;
        Post.getPostsByUser(id, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la récupération des posts"
                });
                return;
            }
            res.status(200).send(result);
        });
    }

}

module.exports = ControllerPost;