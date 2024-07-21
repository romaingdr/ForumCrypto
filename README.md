# Projet de forum en Ligne sur la cryptomonnaie

Ce projet fait partie d'un projet d'étude consistant à développer un forum simple 

## Installation

Pour installer et exécuter ce projet sur votre machine locale, suivez les étapes ci-dessous :

### Prérequis

- Node.js
- MySQL

### Étapes d'installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/romaingdr/ForumCrypto
   cd ForumCrypto
    ```

2. **Configurer la base de données**
    - Créez une base de données MySQL vide
    - Importez le fichier `database_setup/db.sql` dans votre base de données
    - Ajoutez les données prédéfinies avec `database_setup/datas.sql`


3. **Configurer le fichier config.js**
    - Ouvrez le fichier d'environnement du backend
    - Modifiez les informations de connexion à la base de données selon votre configuration
   
4. **Démarrer le serveur**
    ```bash
    cd backend
    npm install
    npm start
    ```

5. **Démarrer le client**
    ```bash
    cd ../frontend
    npm install
    npm start
    ```

6. **Accéder au site**
    - Ouvrez votre navigateur et accédez à `http://localhost:8080`
   

## Auteurs

- [romaingdr](https://github.com/romaingdr)
- [yulannn](https://github.com/yulannn/)
- [corindpz](https://github.com/corindpz)