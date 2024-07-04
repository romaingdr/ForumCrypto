const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, "assets")));

require("./src/routes/users.route")(app);
require("./src/routes/friendship.route")(app);
require("./src/routes/topic.route")(app);
require("./src/routes/categories.route")(app);
require("./src/routes/messagerie.route")(app);
require("./src/routes/post.route")(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
