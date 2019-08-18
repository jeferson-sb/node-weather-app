const fetch = require('node-fetch');

const mapbox_url = process.env.MAPBOX_URL;
const mapbox_token = process.env.MAPBOX_TOKEN;

const geocode = async addr => {
  try {
    const url = `${mapbox_url}/${encodeURIComponent(
      addr
    )}.json?access_token=${mapbox_token}&limit=1`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.features.length === 0) {
      return {
        error: 'Unable to find location, try again with different place'
      };
    }

    const latitude = data.features[0].center[1];
    const longitude = data.features[0].center[0];
    const location = data.features[0].place_name;

    return {
      latitude,
      longitude,
      location
    };
  } catch (error) {
    return { error: 'Unable to connect to location service' };
  }
};

module.exports = geocode;
