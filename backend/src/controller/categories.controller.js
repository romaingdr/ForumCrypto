const Categories = require('../modeles/categories.modele.js');

class ControllerCategories {
    static getAllCategories = (req, res) => {
        Categories.getAllCategories((err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la récupération des catégories"
                });
                return;
            }
            res.status(200).send(result);
        });
    }

    static getCategoryByName = (req, res
    ) => {
        Categories.getCategoryByName(req.params.category, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Une erreur s'est produite lors de la récupération de la catégorie"
                });
                return;
            }
            res.status(200).send(result);
        });
    }
}

module.exports = ControllerCategories;