const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./src/routes/users.route')(app);
require('./src/routes/friendship.route')(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});