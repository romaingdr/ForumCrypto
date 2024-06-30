import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use("/public/", express.static(join(__dirname, "public")));

// Routes

// Page d'accueil
app.get("/", (req, res) => {
  res.render("index");
});

// Page de connexion
app.get("/login", (req, res) => {
  res.render("login");
});

// Page d'inscription
app.get("/register", (req, res) => {
  res.render("register");
});

// Profil utilisateur
app.get("/profile", (req, res) => {
  res.render("profile");
});

// Création de topic
app.get("/topic", (req, res) => {
  res.render("createTopic");
});

// Notifications
app.get("/notifications", (req, res) => {
  res.render("notifications");
});

// Messagerie
app.get('/messagerie', (req, res) => {
  res.render('messagerie');
});

// Catégorie
app.get('/c/:category', (req, res) => {
    res.render('category');
});

// Utilisateur
app.get("/p/:username", (req, res) => {
  res.render("user");
});

// Gestion des topics
app.get('/my-topics', (req, res) => {
    res.render('mytopics');
});

// Page de topic

app.get('/t/:id', (req, res) => {
    res.render('topic');
});

// Page de recherche

app.get('/search', (req, res) => {
    res.render('search');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
