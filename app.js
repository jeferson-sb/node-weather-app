require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

// Serve static assets
app.use(express.static(`${__dirname}/public`));

// Log requests
app.use((req, res, next) => {
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
