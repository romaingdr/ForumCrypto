/* 2 Roles (1: Administrateur, 2: Membre)*/
INSERT INTO roles (role_name) VALUES ("administrateur"), ("membre");

/* 2 Utilisateurs (passwords : mdpadmin & mdpmember */
insert into users (username, email, password, profile_pic, id_role) VALUES ('admin', 'admin@gmail.com', '2aa764b792b6b58706992cc80688f5414aaac6768dcf634e292cfe966943745a5dec2aec3fddc3dd6179fe9ccffa5876b83dfc65c8c3b48a860ef3b04b5a7b3f', 'default_pic.jpg', 1);
insert into users (username, email, password, profile_pic, id_role) VALUES ('member', 'member@gmail.com', 'e78e15663a3df58bef01f775b8b8b4ee9b9fc3e4caa4f71a33642de7a67dd47ce5ffc1a168237866c9cb3e8e6416e6bf74bfdcd784d52c13514bd3032be9950f', 'default_pic.jpg', 2);

/* 4 Catégories */

INSERT INTO categories (title, description, image_path, created_at)
VALUES 
('Actualités et Tendances', 'Discussions sur les dernières nouvelles et les tendances du marché des cryptomonnaies.', "actu.png", CURRENT_TIMESTAMP),
('Blockchain', 'Découvrez ici toutes les discussions et nouveautés sur la blockchain.', "blockchain.png", CURRENT_TIMESTAMP),
('Sécurité et Réglementation', 'Discussions sur la sécurité des portefeuilles, des transactions et les dernières réglementations gouvernementales.', "securite.png", CURRENT_TIMESTAMP),
('Projets et ICOs', 'Discussions sur les nouveaux projets de cryptomonnaie, les offres initiales de pièces (ICOs) et les opportunités dinvestissement.', "projet.png", CURRENT_TIMESTAMP);

/* Topics */

INSERT INTO topics (title, description, id_category, user_id, created_at, status)
VALUES 
('Bitcoin atteint un nouveau sommet historique', 'Discussion sur le récent pic de prix de Bitcoin et ses implications pour le marché.', 1, 1, CURRENT_TIMESTAMP, 'public'),
('Ladoption des cryptomonnaies par les entreprises', 'Comment les entreprises intègrent-elles les cryptomonnaies dans leurs opérations?', 1, 2, CURRENT_TIMESTAMP, 'public');

INSERT INTO topics (title, description, id_category, user_id, created_at, status)
VALUES 
('Sécuriser votre portefeuille de cryptomonnaies', 'Conseils et meilleures pratiques pour protéger vos actifs numériques.', 3, 1, CURRENT_TIMESTAMP, 'public'),
('Les nouvelles réglementations sur les cryptomonnaies en Europe', 'Analyse des récentes lois et régulations affectant le marché des cryptomonnaies en Europe.', 3, 2, CURRENT_TIMESTAMP, 'public');

INSERT INTO topics (title, description, id_category, user_id, created_at, status)
VALUES 
('Nouveautés sur Ethereum 2.0', 'Les dernières mises à jour et améliorations de la blockchain Ethereum.', 2, 1, CURRENT_TIMESTAMP, 'public'),
('Comment fonctionne le consensus Proof of Stake?', 'Discussion sur le mécanisme de consensus PoS et ses avantages par rapport à PoW.', 2, 2, CURRENT_TIMESTAMP, 'public');
