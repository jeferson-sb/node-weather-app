import fetch from "node-fetch";

const forecast = async (latitude, longitude) => {
  const darksky_url = process.env.DARKSKY_URL;
  try {
    const url = `${darksky_url}/${latitude},${longitude}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      throw new Error('Unable to find location');
    }

    let content = `${data.daily.data[0].summary} It is currently ${data.currently.temperature
      } degrees out. There is a ${data.currently.precipProbability
      }% chance of rain`;

    return content;
  } catch (error) {
    throw new Error('Unable to connect to weather service');
  }
};

export default forecast
