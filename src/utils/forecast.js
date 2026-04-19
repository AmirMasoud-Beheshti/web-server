const request = require("request");

const getForecast = (lat, lon, callback) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=57e1dae312674a30aab111828261504&q=${lat},${lon}&aqi=no`;
  console.log(url)
  request({ url, json: true }, (error, { body }) => {
    
    if (error) {
      callback("Unable to connect to forecast service!", undefined);
    } else if (!body) {
      callback(
        "Unable to find your location. please enter another search",
        undefined,
      );
    } else {
      callback(
        undefined,
        `It's currently ${body.current.temp_c} degrees out. It's feel like ${body.current.feelslike_c} degrees out`,
      );
    }
  });
};

module.exports = getForecast;
