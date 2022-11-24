import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import hbs from 'hbs';
import fs from 'fs';
import routes from './routes.js'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'hbs');

// Serve static assets
app.use(express.static(`${__dirname}/public`));

// Log requests
app.use((req, _res, next) => {
  let now = new Date().toLocaleString();
  let log = `${now}: ${req.method} ${req.url}`;

  fs.appendFileSync('server.log', log + '\n');
  next();
});

hbs.registerPartials(`${__dirname}/views/partials`);
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.use('/', routes);

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
