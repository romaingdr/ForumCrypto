import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.use('/public/', express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

