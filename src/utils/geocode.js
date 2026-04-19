const request = require("request");

const getGeocode = (address, callback) => {
  const url = `https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=69b1a2bb70b22454770798nse7128da&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service!", undefined);
    } else if (!body.length || !address) {
      callback("Unable to find location. try another search", undefined);
    } else {
      const location = body[0];
      const { lat, lon, display_name } = location;
      
      callback(undefined, {
        lat,
        lon,
        display_name,
      });
    }
  });
};

module.exports = getGeocode;
