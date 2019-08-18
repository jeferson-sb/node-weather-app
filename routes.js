const router = require('express').Router();
const geocode = require('./services/geocode');
const forecast = require('./services/forecast');

router.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page'
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page'
  });
});

router.get('/help', (req, res) => {
  res.render('help', {
    pageTitle: 'Help Page'
  });
});

router.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      err: 'You must provide an address'
    });
  }

  const { address } = req.query;

  geocode(address).then(({ latitude, longitude, location }) => {
    forecast(latitude, longitude)
      .then(forecastData => {
        res.send({
          forecastData,
          location,
          address
        });
      })
      .catch(err => {
        res.send({ err: err.message });
      });
  });
});

router.use((req, res) => {
  return res.status(404).render('404', {
    pageTitle: '404 - Page not Found',
    errorMessage: 'Page not found!'
  });
});

module.exports = router;
